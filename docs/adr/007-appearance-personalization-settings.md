# ADR-007: Appearance Personalization Settings

**Status:** Accepted
**Date:** 2025-12-30

## Context

Users requested the ability to customize the visual appearance of the Daily Intelligence extension to match their personal preferences. Key requirements included:

1. **Color scheme customization**: Ability to change colors for various UI elements
2. **Background images**: Support for custom background images with overlay controls
3. **Card transparency**: Adjustable opacity for content cards
4. **Persistence**: Settings should persist across sessions and sync across devices
5. **Preset themes**: Quick-select options for users who don't want to customize individually

The extension already used CSS variables (`--bg-primary`, `--accent-teal`, etc.) for theming, providing a foundation for dynamic customization.

## Decision

Implement a comprehensive appearance settings system using Chrome Storage Sync API with the following architecture:

### Storage Strategy

```javascript
// Settings stored in chrome.storage.sync
{
    "appearanceSettings": {
        "bg-primary": "#0f1419",
        "bg-secondary": "#1a1f29",
        "accent-teal": "#14b8a6",
        "accent-amber": "#f59e0b",
        "category-color": "#14b8a6",
        "text-primary": "#f8fafc",
        "date-color": "#f8fafc",
        "bgImageUrl": "",
        "bgOverlayOpacity": 85,
        "bgBlurAmount": 0,
        "cardOpacity": 100
    }
}
```

**Why chrome.storage.sync:**
- Syncs settings across all Chrome instances where user is logged in
- 100KB storage limit is more than sufficient for settings
- Falls back to localStorage for development/testing outside Chrome

### UI Components

**Settings Modal** (`daily-intelligence.html`):
- Gear icon button in header opens modal
- Organized sections: Preset Themes, Colors, Background Image, Card Appearance
- HTML5 color pickers for all color settings
- Range sliders for opacity and blur controls
- Live preview - changes apply immediately as user adjusts

**Preset Themes** (6 options):
| Theme | Description |
|-------|-------------|
| Default | Teal/amber dark theme |
| Midnight | Purple tones |
| Ocean | Blue tones |
| Forest | Green tones |
| Sunset | Red/orange tones |
| Light | Light mode |

### Dynamic CSS Variable Injection

On page load and setting changes, JavaScript updates CSS variables on `:root`:

```javascript
function applyAppearanceSettings() {
    var root = document.documentElement;

    // Apply color variables
    root.style.setProperty('--bg-primary', appearanceSettings['bg-primary']);
    root.style.setProperty('--accent-teal', appearanceSettings['accent-teal']);
    // ... etc

    // Generate alpha variants for hover effects
    var rgbTeal = hexToRgb(appearanceSettings['accent-teal']);
    root.style.setProperty('--accent-teal-15',
        'rgba(' + rgbTeal.r + ', ' + rgbTeal.g + ', ' + rgbTeal.b + ', 0.15)');
}
```

### Background Image Implementation

Three-layer approach for background images:

```
Layer 1 (z-index: -2): bgOverlay - displays the background image with blur
Layer 2 (z-index: -1): bgColorOverlay - semi-transparent color overlay
Layer 3 (z-index: 0+): Page content - cards with adjustable opacity
```

This allows:
- Background images to show through with configurable visibility
- Cards to be semi-transparent revealing the background
- Buttons and modals to remain solid for readability

### Solid UI Elements

Certain elements always remain solid regardless of opacity settings:
- Primary action buttons
- Header buttons (settings, refresh)
- Settings modal content
- Reflection modal content

Enforced via CSS `!important` rules to prevent inheritance of transparency.

### Color Settings Available

| Setting | CSS Variable | Purpose |
|---------|-------------|---------|
| Primary Background | `--bg-primary` | Main page background |
| Card Background | `--bg-secondary` | Cards and containers |
| Primary Accent | `--accent-teal` | Buttons, title, highlights |
| Secondary Accent | `--accent-amber` | Reflection banner, warnings |
| Category Badge | `--category-color` | Insight/microlearning categories |
| Primary Text | `--text-primary` | Main headings and content |
| Secondary Text | `--text-secondary` | Supporting text |
| Date Text | `--date-color` | Header date display |

### Generated Alpha Variants

JavaScript automatically generates semi-transparent versions:
- `--accent-teal-10`, `--accent-teal-15`, `--accent-teal-40`
- `--accent-amber-15`, `--accent-amber-25`
- `--category-bg` (15% opacity of category color)
- `--card-bg` (card background with opacity)
- `--bg-tertiary-alpha` (tertiary background with opacity)

## Consequences

**Positive:**
- **Full customization**: Users can create unique color schemes
- **Cross-device sync**: Settings follow the user across Chrome instances
- **Live preview**: Immediate feedback when adjusting colors
- **Preset convenience**: Quick theming without manual configuration
- **Backward compatible**: Falls back to defaults if no settings saved
- **No build step required**: Pure runtime CSS variable manipulation

**Negative:**
- **Storage dependency**: Requires chrome.storage API (graceful fallback exists)
- **CSS specificity**: Some `!important` rules needed to maintain solid UI elements
- **Increased HTML size**: ~150 lines added for settings modal
- **Increased JS size**: ~300 lines added for settings management

**Neutral:**
- **No color validation**: Users can create unreadable color combinations (their choice)
- **No import/export**: Settings tied to Chrome account (could be added later)

## Alternatives Considered

1. **Browser localStorage only**: Rejected - no cross-device sync
2. **Options page (separate HTML)**: Rejected - in-page modal is more immediate and allows live preview
3. **CSS-only theming with class toggles**: Rejected - too limited for full color customization
4. **Third-party theming library**: Rejected - adds unnecessary dependency
5. **Predefined themes only**: Rejected - users specifically requested full color control

## Future Considerations

- Export/import settings as JSON for backup
- Share themes with other users
- Auto-detect system dark/light mode preference
- Scheduled theme switching (day/night)
- More preset themes based on user feedback
