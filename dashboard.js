// Daily Intelligence - Main JavaScript
// Complete functionality for insights, microlearning, news, and reflections

// Debug mode - set to true for verbose console logging
var DEBUG = false;

function debugLog(message, data) {
    if (DEBUG) {
        if (data !== undefined) {
            console.log('[DI] ' + message, data);
        } else {
            console.log('[DI] ' + message);
        }
    }
}

// Data Arrays - Complete content for insights, microlearnings, and reflections
const INSIGHTS = [
    // Visionary Leadership (12 insights)
    {
        id: 1,
        insight: "Visionary leaders clarify the destination, not the path. Your team needs to know WHERE you're going, then empower them to figure out HOW to get there. Micromanaging the route kills both innovation and ownership.",
        category: "Visionary Leadership",
        sources: [
            { title: "Start With Why - Simon Sinek", url: "https://simonsinek.com/books/start-with-why/" },
            { title: "HBR: The Work of Leadership", url: "https://hbr.org/1997/01/the-work-of-leadership" }
        ]
    },
    {
        id: 2,
        insight: "Strategy is about choosing what NOT to do. Every initiative you add dilutes focus across all others. The most powerful strategic act is killing good ideas to make room for great ones.",
        category: "Visionary Leadership",
        sources: [
            { title: "Good Strategy Bad Strategy - Richard Rumelt", url: "https://www.goodstrategy.com/" },
            { title: "HBR: What Is Strategy?", url: "https://hbr.org/1996/11/what-is-strategy" }
        ]
    },
    {
        id: 3,
        insight: "Paint the future so vividly that your team can see themselves in it. Abstract mission statements inspire no one. Concrete pictures of success—'in 18 months, customers will be able to...'—create momentum.",
        category: "Visionary Leadership",
        sources: [
            { title: "Made to Stick - Chip & Dan Heath", url: "https://heathbrothers.com/books/made-to-stick/" },
            { title: "The Vision Driven Leader - Michael Hyatt", url: "https://fullfocus.co/vision-driven-leader/" }
        ]
    },
    {
        id: 4,
        insight: "Bold bets require bold constraints. Unlimited resources breed mediocrity. The best innovations emerge when you give teams ambitious goals with tight constraints—they force creative problem-solving.",
        category: "Visionary Leadership",
        sources: [
            { title: "Creative Confidence - Tom Kelley & David Kelley", url: "https://www.creativeconfidence.com/" },
            { title: "HBR: Creativity Under the Gun", url: "https://hbr.org/2002/08/creativity-under-the-gun" }
        ]
    },
    {
        id: 5,
        insight: "Your vision must survive contact with reality. Visionary leaders hold the destination constant but adapt the approach relentlessly. Stubbornness about goals, flexibility about methods.",
        category: "Visionary Leadership",
        sources: [
            { title: "The Lean Startup - Eric Ries", url: "https://theleanstartup.com/" },
            { title: "Only the Paranoid Survive - Andy Grove", url: "https://www.penguinrandomhouse.com/books/72469/only-the-paranoid-survive-by-andrew-s-grove/" }
        ]
    },
    {
        id: 6,
        insight: "The best vision is stolen. Don't invent in isolation—study adjacent industries, emerging technologies, and your customers' customers. Pattern recognition beats pure invention.",
        category: "Visionary Leadership",
        sources: [
            { title: "Where Good Ideas Come From - Steven Johnson", url: "https://stevenberlinjohnson.com/books/where-good-ideas-come-from/" },
            { title: "HBR: Recombinant Innovation", url: "https://hbr.org/2019/05/the-science-of-innovation" }
        ]
    },
    {
        id: 7,
        insight: "Communicate your vision in layers. The executive summary for board meetings, the strategy narrative for leadership, and the personal impact story for individual contributors. Same destination, different altitudes.",
        category: "Visionary Leadership",
        sources: [
            { title: "The Pyramid Principle - Barbara Minto", url: "https://www.barbaraminto.com/" },
            { title: "HBR: Strategic Stories", url: "https://hbr.org/1998/05/strategic-stories-how-3m-is-rewriting-business-planning" }
        ]
    },
    {
        id: 8,
        insight: "A vision without metrics is a hallucination. Define what success looks like in observable terms. If you can't measure progress toward your vision, you're just hoping.",
        category: "Visionary Leadership",
        sources: [
            { title: "Measure What Matters - John Doerr", url: "https://www.whatmatters.com/" },
            { title: "HBR: The Balanced Scorecard", url: "https://hbr.org/1992/01/the-balanced-scorecard-measures-that-drive-performance-2" }
        ]
    },
    {
        id: 9,
        insight: "Great visions create productive tension between current reality and future possibility. Too close to today, no inspiration. Too far from today, no credibility. The sweet spot is 'ambitious but achievable.'",
        category: "Visionary Leadership",
        sources: [
            { title: "The Fifth Discipline - Peter Senge", url: "https://www.penguinrandomhouse.com/books/163984/the-fifth-discipline-by-peter-m-senge/" },
            { title: "Built to Last - Jim Collins", url: "https://www.jimcollins.com/books/built-to-last.html" }
        ]
    },
    {
        id: 10,
        insight: "Your competitors can copy your products, but they can't copy your vision of the future. The companies that win long-term are betting on a future state that competitors don't believe in yet.",
        category: "Visionary Leadership",
        sources: [
            { title: "Blue Ocean Strategy - W. Chan Kim", url: "https://www.blueoceanstrategy.com/books/" },
            { title: "HBR: Strategic Intent", url: "https://hbr.org/1989/05/strategic-intent" }
        ]
    },
    {
        id: 11,
        insight: "Vision cascades through storytelling, not slide decks. Every leader at every level should be able to tell the story of why this vision matters to their team specifically. If they can't, the cascade is broken.",
        category: "Visionary Leadership",
        sources: [
            { title: "The Story Factor - Annette Simmons", url: "https://www.annettesimmons.com/the-story-factor/" },
            { title: "HBR: The Irresistible Power of Storytelling", url: "https://hbr.org/2014/03/the-irresistible-power-of-storytelling-as-a-strategic-business-tool" }
        ]
    },
    {
        id: 12,
        insight: "Revisit and refresh your vision regularly. Markets shift, technology evolves, and what seemed distant becomes imminent. A vision that doesn't evolve becomes a cage instead of a compass.",
        category: "Visionary Leadership",
        sources: [
            { title: "The Innovator's Dilemma - Clayton Christensen", url: "https://www.hbs.edu/faculty/Pages/item.aspx?num=46" },
            { title: "HBR: Adaptive Leadership", url: "https://hbr.org/2009/07/the-practice-of-adaptive-leadership" }
        ]
    },
    // Empowering Leadership (12 insights)
    {
        id: 13,
        insight: "Empowerment isn't delegation—it's creating conditions where people can make decisions without you. Build systems, clarify boundaries, and then get out of the way.",
        category: "Empowering Leadership",
        sources: [
            { title: "Turn the Ship Around - David Marquet", url: "https://davidmarquet.com/turn-the-ship-around-book/" },
            { title: "Multipliers - Liz Wiseman", url: "https://www.multipliersbooks.com/" }
        ]
    },
    {
        id: 14,
        insight: "Trust is granted in advance, not earned in arrears. If you wait for someone to prove they're trustworthy before trusting them, you're not leading—you're supervising.",
        category: "Empowering Leadership",
        sources: [
            { title: "The Speed of Trust - Stephen M.R. Covey", url: "https://www.speedoftrust.com/" },
            { title: "HBR: The Neuroscience of Trust", url: "https://hbr.org/2017/01/the-neuroscience-of-trust" }
        ]
    },
    {
        id: 15,
        insight: "Define the decision rights, then disappear. 'You decide all X. Consult me on Y. Escalate only Z.' Teams flounder not from lack of authority, but from unclear authority.",
        category: "Empowering Leadership",
        sources: [
            { title: "HBR: Who Has the D?", url: "https://hbr.org/2006/01/who-has-the-d-how-clear-decision-roles-enhance-organizational-performance" },
            { title: "Team Topologies - Matthew Skelton", url: "https://teamtopologies.com/book" }
        ]
    },
    {
        id: 16,
        insight: "Every time you solve a problem your team could have solved, you've stolen a learning opportunity and created a dependency. Your job is to build capability, not demonstrate yours.",
        category: "Empowering Leadership",
        sources: [
            { title: "Multipliers - Liz Wiseman", url: "https://www.multipliersbooks.com/" },
            { title: "HBR: Why Leaders Don't Delegate", url: "https://hbr.org/2012/03/why-arent-you-delegating" }
        ]
    },
    {
        id: 17,
        insight: "Create guardrails, not gates. Gates require approval to pass through. Guardrails keep people safe while letting them move fast. Build systems that enable speed with safety.",
        category: "Empowering Leadership",
        sources: [
            { title: "Accelerate - Nicole Forsgren", url: "https://itrevolution.com/book/accelerate/" },
            { title: "The DevOps Handbook - Gene Kim", url: "https://itrevolution.com/book/the-devops-handbook/" }
        ]
    },
    {
        id: 18,
        insight: "Ask 'What do you think we should do?' before giving your opinion. Once the leader speaks, discussion often ends. Your ideas aren't more valuable than theirs—but they carry more weight.",
        category: "Empowering Leadership",
        sources: [
            { title: "Radical Candor - Kim Scott", url: "https://www.radicalcandor.com/the-book/" },
            { title: "HBR: How to Manage Smart People", url: "https://hbr.org/2010/03/leading-clever-people" }
        ]
    },
    {
        id: 19,
        insight: "Give people stretch assignments, then protect their right to struggle. Swooping in to rescue at the first sign of difficulty communicates that you don't actually believe they can do it.",
        category: "Empowering Leadership",
        sources: [
            { title: "Mindset - Carol Dweck", url: "https://www.penguinrandomhouse.com/books/44330/mindset-by-carol-s-dweck-phd/" },
            { title: "HBR: The Making of an Expert", url: "https://hbr.org/2007/07/the-making-of-an-expert" }
        ]
    },
    {
        id: 20,
        insight: "Context transfers power. The more your team understands about the business, customers, and constraints, the better decisions they'll make without you. Information hoarding is control hoarding.",
        category: "Empowering Leadership",
        sources: [
            { title: "Powerful - Patty McCord", url: "https://pattymccord.com/book/" },
            { title: "No Rules Rules - Reed Hastings", url: "https://www.norulesrules.com/" }
        ]
    },
    {
        id: 21,
        insight: "Celebrate the decisions, not just the outcomes. When someone makes a good decision that leads to a bad outcome, praise the decision-making. Outcome-only feedback creates risk-averse cultures.",
        category: "Empowering Leadership",
        sources: [
            { title: "Thinking in Bets - Annie Duke", url: "https://www.annieduke.com/books/" },
            { title: "HBR: Learning from Intelligent Failures", url: "https://hbr.org/2011/04/strategies-for-learning-from-failure" }
        ]
    },
    {
        id: 22,
        insight: "Build redundancy in leadership capability. If your organization collapses when you go on vacation, you've built a cult of personality, not a team. The test of empowerment is your irrelevance.",
        category: "Empowering Leadership",
        sources: [
            { title: "Good to Great - Jim Collins", url: "https://www.jimcollins.com/books/good-to-great.html" },
            { title: "HBR: Level 5 Leadership", url: "https://hbr.org/2005/07/level-5-leadership-the-triumph-of-humility-and-fierce-resolve" }
        ]
    },
    {
        id: 23,
        insight: "The most empowering thing you can do is be predictable. When people can predict how you'll react, they don't need to ask permission. Erratic leadership creates permission-seeking cultures.",
        category: "Empowering Leadership",
        sources: [
            { title: "First Break All the Rules - Marcus Buckingham", url: "https://www.gallup.com/workplace/236024/first-break-rules.aspx" },
            { title: "HBR: What Great Managers Do", url: "https://hbr.org/2005/03/what-great-managers-do" }
        ]
    },
    {
        id: 24,
        insight: "Give ownership of outcomes, not just tasks. 'Make sure the deployment goes smoothly' creates accountability. 'Run the deployment script at 6pm' creates compliance. Owners think; taskers execute.",
        category: "Empowering Leadership",
        sources: [
            { title: "Extreme Ownership - Jocko Willink", url: "https://www.echelonfront.com/extreme-ownership/" },
            { title: "Drive - Daniel Pink", url: "https://www.danpink.com/books/drive/" }
        ]
    },
    // Decisive Action (10 insights)
    {
        id: 25,
        insight: "A good decision made quickly beats a perfect decision made slowly. In fast-moving environments, decision velocity is itself a competitive advantage. Decide at 70% certainty and correct as you go.",
        category: "Decisive Action",
        sources: [
            { title: "Jeff Bezos 2016 Letter to Shareholders", url: "https://www.aboutamazon.com/news/company-news/2016-letter-to-shareholders" },
            { title: "HBR: Decide and Deliver", url: "https://hbr.org/2010/06/the-decision-driven-organization" }
        ]
    },
    {
        id: 26,
        insight: "Distinguish between reversible and irreversible decisions. Reversible decisions should be made fast and low in the organization. Irreversible decisions deserve more deliberation and senior involvement.",
        category: "Decisive Action",
        sources: [
            { title: "Amazon's Type 1 and Type 2 Decisions", url: "https://www.aboutamazon.com/about-us/leadership-principles" },
            { title: "HBR: What the Best Strategy Teams Do", url: "https://hbr.org/2019/03/what-the-best-strategic-leaders-do" }
        ]
    },
    {
        id: 27,
        insight: "Analysis paralysis is fear wearing a productivity mask. When you find yourself asking for 'just one more data point,' check if you're seeking information or avoiding decision.",
        category: "Decisive Action",
        sources: [
            { title: "Thinking, Fast and Slow - Daniel Kahneman", url: "https://www.penguinrandomhouse.com/books/89308/thinking-fast-and-slow-by-daniel-kahneman/" },
            { title: "HBR: Making Smarter Decisions", url: "https://hbr.org/2013/10/why-good-leaders-make-bad-decisions" }
        ]
    },
    {
        id: 28,
        insight: "The cost of delay is almost always higher than the cost of a wrong decision you can correct. Markets move, competitors advance, and opportunities expire while you deliberate.",
        category: "Decisive Action",
        sources: [
            { title: "The Principles of Product Development Flow - Don Reinertsen", url: "https://www.leanproductflow.com/" },
            { title: "HBR: The Big Lie of Strategic Planning", url: "https://hbr.org/2014/01/the-big-lie-of-strategic-planning" }
        ]
    },
    {
        id: 29,
        insight: "Disagree and commit, but mean it. Once a decision is made, even if you disagreed, execute as if it were your idea. Half-hearted commitment is organizational sabotage.",
        category: "Decisive Action",
        sources: [
            { title: "Amazon Leadership Principles", url: "https://www.aboutamazon.com/about-us/leadership-principles" },
            { title: "High Output Management - Andy Grove", url: "https://www.penguinrandomhouse.com/books/72467/high-output-management-by-andrew-s-grove/" }
        ]
    },
    {
        id: 30,
        insight: "Name the defaults. 'If we don't hear back by Friday, we proceed with option A.' Silence should never mean limbo. Force decisions by making inaction itself a choice.",
        category: "Decisive Action",
        sources: [
            { title: "Nudge - Richard Thaler", url: "https://www.penguinrandomhouse.com/books/304634/nudge-by-richard-h-thaler-and-cass-r-sunstein/" },
            { title: "HBR: Decision-Making Traps", url: "https://hbr.org/1998/09/the-hidden-traps-in-decision-making-2" }
        ]
    },
    {
        id: 31,
        insight: "The leader's job is often to break ties, not to make every decision. Create processes for the 80% of decisions that don't need you, and preserve your attention for the 20% that do.",
        category: "Decisive Action",
        sources: [
            { title: "The Effective Executive - Peter Drucker", url: "https://www.drucker.institute/books/the-effective-executive/" },
            { title: "HBR: Stop Over-Engineering Decision Making", url: "https://hbr.org/2020/09/stop-overcomplicating-it-the-simple-guidebook-to-upping-your-management-game" }
        ]
    },
    {
        id: 32,
        insight: "Document the decision, not just the outcome. Future you (and your team) will want to know why you decided X. Decision logs prevent re-litigation and accelerate organizational learning.",
        category: "Decisive Action",
        sources: [
            { title: "Architecture Decision Records", url: "https://adr.github.io/" },
            { title: "HBR: How to Make Better Decisions", url: "https://hbr.org/2009/09/how-to-make-good-decisions" }
        ]
    },
    {
        id: 33,
        insight: "Kill zombie projects decisively. Sunk costs are sunk. The resources you're spending on a failing initiative are resources you're not spending on better opportunities. Pull the plug cleanly.",
        category: "Decisive Action",
        sources: [
            { title: "The Innovator's Solution - Clayton Christensen", url: "https://www.hbs.edu/faculty/Pages/item.aspx?num=47" },
            { title: "HBR: Knowing When to Pull the Plug", url: "https://hbr.org/2007/03/knowing-when-to-pull-the-plug" }
        ]
    },
    {
        id: 34,
        insight: "Speed is a habit, not an event. Organizations that make decisions quickly do so because they've built the muscle through practice. Start small, reward velocity, and watch the culture shift.",
        category: "Decisive Action",
        sources: [
            { title: "Blitzscaling - Reid Hoffman", url: "https://www.blitzscaling.com/" },
            { title: "HBR: The Acceleration Trap", url: "https://hbr.org/2010/04/the-acceleration-trap" }
        ]
    },
    // Coaching Mindset (8 insights)
    {
        id: 35,
        insight: "Ask questions you don't know the answer to. Coaching isn't Socratic method where you lead to a predetermined conclusion. Genuine curiosity opens possibilities that your assumptions would close.",
        category: "Coaching Mindset",
        sources: [
            { title: "The Coaching Habit - Michael Bungay Stanier", url: "https://www.mbs.works/the-coaching-habit/" },
            { title: "Co-Active Coaching", url: "https://www.thecoaches.com/store/products/co-active-coaching-book" }
        ]
    },
    {
        id: 36,
        insight: "Stay in the question longer than is comfortable. When you rush to solutions, you often solve the wrong problem. The question 'What's really going on here?' asked three times yields different answers each time.",
        category: "Coaching Mindset",
        sources: [
            { title: "The Advice Trap - Michael Bungay Stanier", url: "https://www.mbs.works/the-advice-trap/" },
            { title: "HBR: The Leader as Coach", url: "https://hbr.org/2019/11/the-leader-as-coach" }
        ]
    },
    {
        id: 37,
        insight: "Your coachee should leave conversations feeling smarter, not you. If you're the one doing most of the talking and feeling clever, you're consulting, not coaching. Flip the ratio.",
        category: "Coaching Mindset",
        sources: [
            { title: "Trillion Dollar Coach - Eric Schmidt", url: "https://www.trilliondollarcoach.com/" },
            { title: "HBR: What Can Coaches Do for You?", url: "https://hbr.org/2009/01/what-can-coaches-do-for-you" }
        ]
    },
    {
        id: 38,
        insight: "Coach to the person, not the situation. The same problem requires different coaching depending on who's facing it. An experienced person needs different questions than a novice—even for identical challenges.",
        category: "Coaching Mindset",
        sources: [
            { title: "Situational Leadership - Ken Blanchard", url: "https://www.kenblanchard.com/Products-Services/Situational-Leadership-II" },
            { title: "The One Minute Manager - Ken Blanchard", url: "https://www.kenblanchard.com/Books" }
        ]
    },
    {
        id: 39,
        insight: "Permission to coach isn't assumed—it's earned. Before launching into developmental feedback, check if the person is open to it. 'Can I share an observation?' respects autonomy and increases receptivity.",
        category: "Coaching Mindset",
        sources: [
            { title: "Thanks for the Feedback - Douglas Stone", url: "https://www.penguinrandomhouse.com/books/313485/thanks-for-the-feedback-by-douglas-stone-and-sheila-heen/" },
            { title: "HBR: The Feedback Fallacy", url: "https://hbr.org/2019/03/the-feedback-fallacy" }
        ]
    },
    {
        id: 40,
        insight: "The best coaches hold a higher vision of someone than they hold of themselves. Your belief in their potential—held genuinely, not patronizingly—becomes a scaffold for their growth.",
        category: "Coaching Mindset",
        sources: [
            { title: "Positive Intelligence - Shirzad Chamine", url: "https://www.positiveintelligence.com/books/" },
            { title: "HBR: Building Confidence in Others", url: "https://hbr.org/2020/09/the-importance-of-building-confidence" }
        ]
    },
    {
        id: 41,
        insight: "Silence is a coaching superpower. After asking a question, let the silence stretch. The discomfort you feel is nothing compared to the insight that emerges when you resist filling the space.",
        category: "Coaching Mindset",
        sources: [
            { title: "The Coaching Habit - Michael Bungay Stanier", url: "https://www.mbs.works/the-coaching-habit/" },
            { title: "Quiet Leadership - David Rock", url: "https://davidrock.net/books/quiet-leadership/" }
        ]
    },
    {
        id: 42,
        insight: "Name what you're seeing, not what you're judging. 'I noticed you didn't speak in that meeting' opens dialogue. 'You were disengaged in that meeting' closes it. Observations invite; interpretations defend.",
        category: "Coaching Mindset",
        sources: [
            { title: "Nonviolent Communication - Marshall Rosenberg", url: "https://www.nonviolentcommunication.com/product/nvc/" },
            { title: "Crucial Conversations", url: "https://cruciallearning.com/crucial-conversations-book/" }
        ]
    },
    // Strategic Execution (6 insights)
    {
        id: 43,
        insight: "Strategy without execution is hallucination. Execution without strategy is chaos. Your job is to hold both—ensuring the big picture translates into daily actions that compound over time.",
        category: "Strategic Execution",
        sources: [
            { title: "Execution - Larry Bossidy", url: "https://www.penguinrandomhouse.com/books/10098/execution-by-larry-bossidy-and-ram-charan/" },
            { title: "HBR: Closing the Strategy-Execution Gap", url: "https://hbr.org/2017/12/stop-distinguishing-between-execution-and-strategy" }
        ]
    },
    {
        id: 44,
        insight: "Quarterly objectives mean nothing if they don't connect to daily behaviors. Build the bridge between annual strategy and this week's priorities. If you can't explain the connection, it doesn't exist.",
        category: "Strategic Execution",
        sources: [
            { title: "The 4 Disciplines of Execution - Chris McChesney", url: "https://www.franklincovey.com/books/4-disciplines/" },
            { title: "Measure What Matters - John Doerr", url: "https://www.whatmatters.com/" }
        ]
    },
    {
        id: 45,
        insight: "Lead measures beat lag measures. Revenue tells you where you've been; pipeline tells you where you're going. Find the metrics you can influence today that predict the outcomes you want tomorrow.",
        category: "Strategic Execution",
        sources: [
            { title: "The 4 Disciplines of Execution - Chris McChesney", url: "https://www.franklincovey.com/books/4-disciplines/" },
            { title: "HBR: Leading Indicators", url: "https://hbr.org/2010/03/leading-change-lessons-from-lt" }
        ]
    },
    {
        id: 46,
        insight: "Execution cadence matters more than execution planning. Weekly reviews catch drift early. Monthly reviews catch it late. Build rhythm into how you track progress, and problems surface before they metastasize.",
        category: "Strategic Execution",
        sources: [
            { title: "Scaling Up - Verne Harnish", url: "https://scalingup.com/" },
            { title: "High Output Management - Andy Grove", url: "https://www.penguinrandomhouse.com/books/72467/high-output-management-by-andrew-s-grove/" }
        ]
    },
    {
        id: 47,
        insight: "The bottleneck is always somewhere. When you clear one, another appears. Strategic execution isn't about eliminating constraints—it's about identifying the current constraint and focusing energy there.",
        category: "Strategic Execution",
        sources: [
            { title: "The Goal - Eliyahu Goldratt", url: "https://www.tocinstitute.org/the-goal-summary.html" },
            { title: "The Phoenix Project - Gene Kim", url: "https://itrevolution.com/book/the-phoenix-project/" }
        ]
    },
    {
        id: 48,
        insight: "Preserve optionality where uncertainty is high, commit decisively where it isn't. Not everything needs to be figured out upfront—but the things that do, need full commitment. Know which is which.",
        category: "Strategic Execution",
        sources: [
            { title: "Antifragile - Nassim Nicholas Taleb", url: "https://www.penguinrandomhouse.com/books/176227/antifragile-by-nassim-nicholas-taleb/" },
            { title: "HBR: Strategy Under Uncertainty", url: "https://hbr.org/1997/11/strategy-under-uncertainty" }
        ]
    },
    // Technical Leadership (5 insights)
    {
        id: 49,
        insight: "Technical debt is a strategic tool, not a moral failure. Sometimes moving fast and fixing later is exactly right. What matters is intentional debt with a payoff plan—not accidental debt from sloppy thinking.",
        category: "Technical Leadership",
        sources: [
            { title: "Managing Technical Debt - Philippe Kruchten", url: "https://www.oreilly.com/library/view/managing-technical-debt/9780135645932/" },
            { title: "HBR: High-Velocity IT", url: "https://hbr.org/2019/06/the-high-velocity-it-operating-model" }
        ]
    },
    {
        id: 50,
        insight: "Your architecture should evolve at the rate your business needs. Over-engineering for hypothetical scale is as costly as under-engineering for actual scale. Design for the next 18 months, not the next decade.",
        category: "Technical Leadership",
        sources: [
            { title: "Building Evolutionary Architectures - Neal Ford", url: "https://www.oreilly.com/library/view/building-evolutionary-architectures/9781492097532/" },
            { title: "HBR: The Technology Trap", url: "https://hbr.org/2015/10/why-strategy-execution-unravels" }
        ]
    },
    {
        id: 51,
        insight: "Translate relentlessly between business and engineering. The CFO doesn't care about microservices; they care about agility. The engineers don't care about revenue; they care about clean systems. Be the bridge.",
        category: "Technical Leadership",
        sources: [
            { title: "The Manager's Path - Camille Fournier", url: "https://www.oreilly.com/library/view/the-managers-path/9781491973882/" },
            { title: "An Elegant Puzzle - Will Larson", url: "https://lethain.com/elegant-puzzle/" }
        ]
    },
    {
        id: 52,
        insight: "Platform teams succeed when they treat other engineers as customers. Build for adoption, not compliance. If teams have to be mandated to use your platform, you've failed the product test.",
        category: "Technical Leadership",
        sources: [
            { title: "Team Topologies - Matthew Skelton", url: "https://teamtopologies.com/book" },
            { title: "Staff Engineer - Will Larson", url: "https://staffeng.com/book" }
        ]
    },
    {
        id: 53,
        insight: "Every technology choice is a people choice. Will you be able to hire for it? Can your team maintain it? Does it match your culture? The 'best' technology that your organization can't sustain is the worst choice.",
        category: "Technical Leadership",
        sources: [
            { title: "Accelerate - Nicole Forsgren", url: "https://itrevolution.com/book/accelerate/" },
            { title: "HBR: How to Pick Technology", url: "https://hbr.org/2021/01/the-overlooked-key-to-a-successful-scale-up" }
        ]
    },
    // Change Leadership (3 insights)
    {
        id: 54,
        insight: "People don't resist change—they resist loss. Understand what the change threatens (status, competence, relationships, certainty) and address those fears specifically. Abstract change messages bounce off.",
        category: "Change Leadership",
        sources: [
            { title: "Switch - Chip & Dan Heath", url: "https://heathbrothers.com/books/switch/" },
            { title: "HBR: Leading Change", url: "https://hbr.org/1995/05/leading-change-why-transformation-efforts-fail-2" }
        ]
    },
    {
        id: 55,
        insight: "Change happens at the speed of trust. If trust is low, even small changes feel threatening. If trust is high, even large changes feel exciting. Invest in relationships before you need to spend them.",
        category: "Change Leadership",
        sources: [
            { title: "The Speed of Trust - Stephen M.R. Covey", url: "https://www.speedoftrust.com/" },
            { title: "Our Iceberg Is Melting - John Kotter", url: "https://www.kotterinc.com/books/our-iceberg-is-melting/" }
        ]
    },
    {
        id: 56,
        insight: "Find the bright spots. In every organization, someone is already doing what you want everyone to do. Find them, understand why it's working, and make their approach visible and replicable.",
        category: "Change Leadership",
        sources: [
            { title: "Switch - Chip & Dan Heath", url: "https://heathbrothers.com/books/switch/" },
            { title: "Positive Deviance - Richard Pascale", url: "https://www.bkconnection.com/books/title/The-Power-of-Positive-Deviance" }
        ]
    },
    // Team Dynamics (2 insights)
    {
        id: 57,
        insight: "Psychological safety isn't about being nice—it's about being able to take risks without fear of punishment. High-performing teams fight hard about ideas but never make it personal.",
        category: "Team Dynamics",
        sources: [
            { title: "The Fearless Organization - Amy Edmondson", url: "https://fearlessorganization.com/" },
            { title: "HBR: Psychological Safety", url: "https://hbr.org/2017/08/high-performing-teams-need-psychological-safety-heres-how-to-create-it" }
        ]
    },
    {
        id: 58,
        insight: "The best indicator of team health is how they handle conflict. Healthy teams surface disagreements early, argue productively, and commit to outcomes. Unhealthy teams avoid conflict—then explode or disengage.",
        category: "Team Dynamics",
        sources: [
            { title: "The Five Dysfunctions of a Team - Patrick Lencioni", url: "https://www.tablegroup.com/product/the-five-dysfunctions-of-a-team/" },
            { title: "HBR: Build a Culture of Healthy Conflict", url: "https://hbr.org/2018/04/how-to-design-an-agenda-for-an-effective-meeting" }
        ]
    },
    // Communication Excellence (2 insights)
    {
        id: 59,
        insight: "Tailor your message to your audience's incentives. Engineers care about elegance, executives care about ROI, customers care about outcomes. The same message must be translated for each.",
        category: "Communication Excellence",
        sources: [
            { title: "Made to Stick - Chip & Dan Heath", url: "https://heathbrothers.com/books/made-to-stick/" },
            { title: "HBR: How Leaders Create and Use Networks", url: "https://hbr.org/2007/01/how-leaders-create-and-use-networks" }
        ]
    },
    {
        id: 60,
        insight: "Say the hard thing early. Burying bad news or difficult feedback at the end of a conversation means people are anxious the whole time and don't hear anything else. Lead with the headline.",
        category: "Communication Excellence",
        sources: [
            { title: "Radical Candor - Kim Scott", url: "https://www.radicalcandor.com/the-book/" },
            { title: "Difficult Conversations - Douglas Stone", url: "https://www.penguinrandomhouse.com/books/331191/difficult-conversations-by-douglas-stone-bruce-patton-and-sheila-heen/" }
        ]
    }
];

const MICROLEARNINGS = [
    {
        id: 1,
        topic: "Gradient Descent",
        category: "AI/ML Fundamentals",
        content: "Gradient descent is like rolling a ball down a hill to find the lowest point. Each step adjusts parameters to reduce error, moving toward optimal weights.",
        sources: [
            { title: "3Blue1Brown: Neural Networks", url: "https://www.3blue1brown.com/topics/neural-networks" }
        ],
        quiz: {
            question: "What is the primary purpose of gradient descent?",
            options: [
                "Finding optimal parameters by minimizing loss",
                "Generating training data",
                "Selecting architecture",
                "Normalizing inputs"
            ],
            correct: 0,
            explanation: "Gradient descent iteratively adjusts parameters to minimize the loss function.",
            brushUpLink: { title: "Gradient Descent Guide", url: "https://machinelearningmastery.com/gradient-descent-for-machine-learning/" }
        },
        difficulty: "intermediate"
    }
    // Add all 100 microlearnings here...
];

const REFLECTIONS = [
    { id: 1, question: "What belief about myself am I outgrowing today?", theme: "Personal Evolution" },
    { id: 2, question: "Where am I leading from fear instead of vision?", theme: "Leadership Awareness" },
    { id: 3, question: "Who on my team needs to be seen, and how will I show up for them?", theme: "Team Connection" }
    // Add all 52 reflections here...
];

// State Management
const state = {
    seenInsights: [],
    seenMicrolearnings: [],
    seenReflections: [],
    quizProgress: {},
    reflections: {},
    currentInsight: null,
    currentMicrolearning: null,
    currentReflection: null,
    expandedArticles: [],
    viewedArticles: []
};

// Daily cache for persisting dashboard content across new tabs
// Refreshes after 12 hours to ensure daily content rotation
const DAILY_CACHE_KEY = 'dashboard_daily_cache';
const CACHE_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
let dailyCache = null;

// Check if the cached data is still valid (less than 12 hours old)
function isCacheValid(cache) {
    if (!cache || !cache.timestamp) {
        return false;
    }

    var now = Date.now();
    var cacheAge = now - cache.timestamp;

    // Cache is valid if it's less than 12 hours old
    return cacheAge < CACHE_DURATION_MS;
}

// Load daily cache from localStorage
function loadDailyCache() {
    try {
        var saved = localStorage.getItem(DAILY_CACHE_KEY);
        if (saved) {
            var parsed = JSON.parse(saved);
            if (isCacheValid(parsed)) {
                dailyCache = parsed;
                var hoursRemaining = Math.round((CACHE_DURATION_MS - (Date.now() - parsed.timestamp)) / (60 * 60 * 1000) * 10) / 10;
                debugLog('Cache valid - ' + hoursRemaining + ' hours until refresh');
                return true;
            } else {
                var hoursOld = Math.round((Date.now() - parsed.timestamp) / (60 * 60 * 1000) * 10) / 10;
                debugLog('Cache expired (' + hoursOld + ' hours old)');
                localStorage.removeItem(DAILY_CACHE_KEY);
            }
        }
    } catch (e) {
        console.error('Failed to load daily cache:', e);
        localStorage.removeItem(DAILY_CACHE_KEY);
    }
    dailyCache = null;
    return false;
}

// Save daily cache to localStorage
function saveDailyCache() {
    try {
        if (dailyCache) {
            localStorage.setItem(DAILY_CACHE_KEY, JSON.stringify(dailyCache));
        }
    } catch (e) {
        console.error('Failed to save daily cache:', e);
    }
}

// Initialize a new daily cache
function initDailyCache() {
    dailyCache = {
        timestamp: Date.now(),
        insight: null,
        microlearning: null,
        reflection: null,
        newsData: null
    };
}

// Force refresh all content (manual override)
var isRefreshing = false;

function refreshAllContent() {
    // Prevent rapid clicks causing race conditions
    if (isRefreshing) return;
    isRefreshing = true;

    debugLog('Manual refresh triggered');

    // Preserve reflection question so user doesn't lose their current prompt
    var preservedReflection = dailyCache ? dailyCache.reflection : null;

    // Clear localStorage cache
    localStorage.removeItem(DAILY_CACHE_KEY);

    // Reset in-memory cache
    dailyCache = null;
    summaryData = null;

    // Re-initialize fresh cache
    initDailyCache();

    // Restore reflection question if it existed
    if (preservedReflection && dailyCache) {
        dailyCache.reflection = preservedReflection;
    }

    // Reload all content sections
    loadDailyInsight();
    loadMicrolearning();
    loadDailyReflection();
    loadNews();

    // Reset refresh guard after delay
    setTimeout(function() { isRefreshing = false; }, 1000);

    debugLog('Content refresh complete');
}

// Valid state keys for safe loading
const VALID_STATE_KEYS = ['seenInsights', 'seenMicrolearnings', 'seenReflections',
    'quizProgress', 'reflections', 'expandedArticles', 'viewedArticles'];

// Summary data loaded from summary.json
let summaryData = null;

// Initialize
function init() {
    loadState();
    var cacheIsValid = loadDailyCache();

    // If no valid cache exists, initialize a new one
    if (!cacheIsValid) {
        initDailyCache();
    }

    displayCurrentDate();
    loadDailyInsight();
    loadMicrolearning();
    loadDailyReflection();

    // Load API key first, then load news
    loadApiKey().then(function(key) {
        if (!key) {
            debugLog('No API key - using basic RSS fetching without AI summaries');
        }
        loadNews();
    });

    updateReflectionTrigger();
    setupEventListeners();
}

// Setup all event listeners (no inline handlers)
function setupEventListeners() {
    // Close reflection modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeReflectionModal();
            closeInstructionsModal();
        }
    });

    // Reflection modal backdrop click
    var reflectionModal = document.getElementById('reflectionModal');
    if (reflectionModal) {
        reflectionModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeReflectionModal();
            }
        });
    }

    // Reflection trigger button
    var reflectionTrigger = document.getElementById('reflectionTrigger');
    if (reflectionTrigger) {
        reflectionTrigger.addEventListener('click', openReflectionModal);
    }

    // Reflection modal close button
    var reflectionClose = document.getElementById('reflectionModalClose');
    if (reflectionClose) {
        reflectionClose.addEventListener('click', closeReflectionModal);
    }

    // Next insight button
    var nextInsightBtn = document.getElementById('nextInsightBtn');
    if (nextInsightBtn) {
        nextInsightBtn.addEventListener('click', refreshInsight);
    }

    // Refresh content button
    var refreshBtn = document.getElementById('refreshContentBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshAllContent);
    }

    // Event delegation for dynamically created elements
    document.addEventListener('click', function(e) {
        var target = e.target;

        // Quiz button
        if (target.classList.contains('show-quiz-btn')) {
            var learningId = parseInt(target.getAttribute('data-learning-id'), 10);
            showQuiz(learningId);
            return;
        }

        // Quiz option
        if (target.classList.contains('quiz-option')) {
            var quizId = parseInt(target.getAttribute('data-quiz-id'), 10);
            var optionIdx = parseInt(target.getAttribute('data-option-idx'), 10);
            checkAnswer(quizId, optionIdx);
            return;
        }

        // News header (article toggle)
        var newsHeader = target.closest('.news-header');
        if (newsHeader) {
            var articleId = newsHeader.getAttribute('data-article-id');
            if (articleId) {
                toggleArticle(articleId);
            }
            return;
        }

        // More articles toggle
        if (target.classList.contains('more-articles-toggle') || target.closest('.more-articles-toggle')) {
            var toggleBtn = target.classList.contains('more-articles-toggle') ? target : target.closest('.more-articles-toggle');
            var categoryKey = toggleBtn.getAttribute('data-category');
            if (categoryKey) {
                toggleMoreArticles(categoryKey);
            }
            return;
        }

        // Show regenerate instructions button
        if (target.classList.contains('show-instructions-btn')) {
            showRegenerateInstructions();
            return;
        }

        // Instructions modal close/backdrop
        if (target.id === 'instructions-modal' || target.classList.contains('instructions-modal-close')) {
            closeInstructionsModal();
            return;
        }

        // Save reflection button
        if (target.classList.contains('save-reflection-btn')) {
            saveReflection();
            return;
        }

        // Export reflections button
        if (target.classList.contains('export-reflections-btn')) {
            exportReflections();
            return;
        }
    });
}

function loadState() {
    try {
        var saved = localStorage.getItem('dashboard_state');
        if (saved) {
            var parsed = JSON.parse(saved);
            // Only copy valid/expected properties to prevent injection
            VALID_STATE_KEYS.forEach(function(key) {
                if (parsed.hasOwnProperty(key)) {
                    state[key] = parsed[key];
                }
            });
        }
    } catch (e) {
        console.error('Failed to load state, using defaults:', e);
        localStorage.removeItem('dashboard_state');
    }
}

function saveState() {
    localStorage.setItem('dashboard_state', JSON.stringify(state));
}

function displayCurrentDate() {
    var now = new Date();
    document.getElementById('currentDate').textContent =
        now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Daily Insight
function loadDailyInsight() {
    // Guard against empty data array
    if (INSIGHTS.length === 0) {
        document.getElementById('insightDisplay').innerHTML =
            '<p style="color: var(--text-tertiary);">No insights available.</p>';
        return;
    }

    // Check if we have a cached insight for today
    if (dailyCache && dailyCache.insight) {
        var insight = dailyCache.insight;
        state.currentInsight = insight;
        renderInsight(insight);
        return;
    }

    // Generate new insight
    var available = INSIGHTS.filter(function(i) { return state.seenInsights.indexOf(i.id) === -1; });
    if (available.length === 0) {
        state.seenInsights = [];
        available = INSIGHTS; // Use full array instead of recursion
    }

    var insight = available[Math.floor(Math.random() * available.length)];
    state.currentInsight = insight;
    state.seenInsights.push(insight.id);
    saveState();

    // Cache the insight for today
    if (dailyCache) {
        dailyCache.insight = insight;
        saveDailyCache();
    }

    renderInsight(insight);
}

// Render insight to the display
function renderInsight(insight) {
    var sourcesHtml = insight.sources.map(function(s) {
        return '<a href="' + s.url + '" class="source-link" target="_blank">' + s.title + '</a>';
    }).join('');

    document.getElementById('insightDisplay').innerHTML =
        '<span class="insight-category">' + insight.category + '</span>' +
        '<p style="font-size: 1.15rem; line-height: 1.8; margin: 1rem 0; color: var(--text-secondary);">' +
            insight.insight +
        '</p>' +
        '<div style="margin-top: 1.5rem;">' +
            '<div style="font-size: 0.85rem; font-weight: 600; color: var(--text-tertiary); margin-bottom: 0.75rem;">SOURCES</div>' +
            sourcesHtml +
        '</div>';
}

function refreshInsight() {
    // Clear cached insight so a new one is generated
    if (dailyCache) {
        dailyCache.insight = null;
    }
    loadDailyInsight();
}

// Microlearning
function loadMicrolearning() {
    // Guard against empty data array
    if (MICROLEARNINGS.length === 0) {
        document.getElementById('microlearningDisplay').innerHTML =
            '<p style="color: var(--text-tertiary);">No microlearnings available.</p>';
        return;
    }

    // Check if we have a cached microlearning for today
    if (dailyCache && dailyCache.microlearning) {
        var learning = dailyCache.microlearning;
        state.currentMicrolearning = learning;
        renderMicrolearning(learning);
        return;
    }

    // Generate new microlearning
    var available = MICROLEARNINGS.filter(function(m) { return state.seenMicrolearnings.indexOf(m.id) === -1; });
    if (available.length === 0) {
        state.seenMicrolearnings = [];
        available = MICROLEARNINGS; // Use full array instead of recursion
    }

    var learning = available[Math.floor(Math.random() * available.length)];
    state.currentMicrolearning = learning;
    state.seenMicrolearnings.push(learning.id);
    saveState();

    // Cache the microlearning for today
    if (dailyCache) {
        dailyCache.microlearning = learning;
        saveDailyCache();
    }

    renderMicrolearning(learning);
}

// Render microlearning to the display
function renderMicrolearning(learning) {
    var masteredCount = Object.values(state.quizProgress).filter(function(p) { return p.mastery === 'mastered'; }).length;

    var sourcesHtml = learning.sources.map(function(s) {
        return '<a href="' + s.url + '" class="source-link" target="_blank">' + s.title + '</a>';
    }).join('');

    document.getElementById('microlearningDisplay').innerHTML =
        '<div class="progress-bar">' +
            '<div class="progress-fill" style="width: ' + ((masteredCount / MICROLEARNINGS.length) * 100) + '%"></div>' +
        '</div>' +
        '<p style="font-size: 0.85rem; text-align: center; color: var(--text-tertiary); margin-bottom: 1.5rem;">' +
            masteredCount + ' of ' + MICROLEARNINGS.length + ' mastered' +
        '</p>' +
        '<span class="insight-category">' + learning.category + '</span>' +
        '<h3 style="font-size: 1.25rem; margin: 1rem 0;">' + learning.topic + '</h3>' +
        '<p style="line-height: 1.7; color: var(--text-secondary); margin-bottom: 1rem;">' +
            learning.content +
        '</p>' +
        '<div style="margin: 1rem 0;">' + sourcesHtml + '</div>' +
        '<button class="btn show-quiz-btn" data-learning-id="' + learning.id + '">Test Your Knowledge</button>' +
        '<div id="quiz-' + learning.id + '" class="quiz-container"></div>';
}

function showQuiz(id) {
    var learning = MICROLEARNINGS.find(function(m) { return m.id === id; });
    var container = document.getElementById('quiz-' + id);

    var optionsHtml = learning.quiz.options.map(function(opt, idx) {
        return '<div class="quiz-option" data-quiz-id="' + id + '" data-option-idx="' + idx + '">' + opt + '</div>';
    }).join('');

    container.innerHTML =
        '<div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1.5rem;">' + learning.quiz.question + '</div>' +
        '<div id="options-' + id + '">' + optionsHtml + '</div>' +
        '<div id="feedback-' + id + '"></div>';

    container.style.display = 'block';
}

function checkAnswer(id, selected) {
    var learning = MICROLEARNINGS.find(function(m) { return m.id === id; });
    var isCorrect = selected === learning.quiz.correct;

    var options = document.querySelectorAll('#options-' + id + ' .quiz-option');
    options.forEach(function(opt, idx) {
        opt.style.pointerEvents = 'none';
        if (idx === learning.quiz.correct) opt.classList.add('correct');
        if (idx === selected && !isCorrect) opt.classList.add('incorrect');
    });

    if (!state.quizProgress[id]) {
        state.quizProgress[id] = { correct: 0, attempts: 0, mastery: 'new' };
    }

    state.quizProgress[id].attempts++;
    if (isCorrect) {
        state.quizProgress[id].correct++;
        if (state.quizProgress[id].correct >= 4) {
            state.quizProgress[id].mastery = 'mastered';
        }
    }
    saveState();

    var feedbackHtml = isCorrect
        ? '<div style="margin-top: 1.5rem; padding: 1rem; background: rgba(16, 185, 129, 0.1); border: 1px solid var(--success); border-radius: 8px;">' +
              '<strong>Correct!</strong> ' + learning.quiz.explanation +
          '</div>'
        : '<div style="margin-top: 1.5rem; padding: 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid var(--error); border-radius: 8px;">' +
              '<strong>Incorrect.</strong> ' + learning.quiz.explanation +
              '<div style="margin-top: 1rem;">' +
                  '<a href="' + learning.quiz.brushUpLink.url + '" class="btn" target="_blank">Brush Up</a>' +
              '</div>' +
          '</div>';

    document.getElementById('feedback-' + id).innerHTML = feedbackHtml;

    // Update the progress bar immediately after answering
    updateProgressBar();
}

// Update just the progress bar without re-rendering the entire microlearning section
function updateProgressBar() {
    var masteredCount = Object.values(state.quizProgress).filter(function(p) { return p.mastery === 'mastered'; }).length;
    var progressFill = document.querySelector('.progress-fill');
    var progressText = document.querySelector('#microlearningDisplay > p');

    if (progressFill) {
        progressFill.style.width = ((masteredCount / MICROLEARNINGS.length) * 100) + '%';
    }
    if (progressText) {
        progressText.textContent = masteredCount + ' of ' + MICROLEARNINGS.length + ' mastered';
    }
}

// ============================================
// NEWS SECTION - Summary.json Integration
// ============================================

// Sample fallback data when summary.json is not available
var FALLBACK_NEWS = {
    ai_news: [
        { title: "Claude 4 Achieves New Benchmarks", source: "TechCrunch", link: "#", description: "Anthropic's latest model shows significant improvements in reasoning and coding benchmarks, marking a new milestone in AI development." },
        { title: "DeepMind's AlphaProof Breakthrough", source: "MIT Tech Review", link: "#", description: "Google DeepMind announces mathematical proof-finding capabilities that could revolutionize formal verification." },
        { title: "OpenAI Introduces GPT-5 Preview", source: "The Verge", link: "#", description: "Early access to next-generation language model shows impressive multimodal reasoning capabilities." }
    ],
    business_news: [
        { title: "Future of Work: Hybrid Models", source: "HBR", link: "#", description: "New research reveals optimal strategies for balancing remote and in-office work to maximize productivity and employee satisfaction." },
        { title: "Digital Transformation ROI 2025", source: "McKinsey", link: "#", description: "Companies investing strategically in AI and cloud see 40% higher returns on digital initiatives." },
        { title: "Platform Business Models", source: "Strategy+Business", link: "#", description: "How network effects and ecosystem thinking are reshaping competitive advantage across industries." }
    ],
    leadership_news: [
        { title: "Building Psychological Safety", source: "HBR Leadership", link: "#", description: "Leaders who create safe environments for risk-taking see 35% higher innovation rates in their teams." },
        { title: "New Rules of Leadership Presence", source: "Fast Company", link: "#", description: "Virtual leadership requires new skills in communication, trust-building, and digital body language." },
        { title: "High-Trust Teams", source: "Inc.", link: "#", description: "Research shows trust accelerates decision-making and reduces management overhead by up to 50%." }
    ]
};

// ============================================
// LIVE RSS FEED FETCHING & GROQ INTEGRATION
// ============================================

// RSS Feed Sources
var RSS_FEED_SOURCES = {
    ai_news: [
        'https://techcrunch.com/category/artificial-intelligence/feed/',
        'https://www.technologyreview.com/feed',
        'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml',
        'https://news.mit.edu/rss/topic/artificial-intelligence2',
        'https://openai.com/blog/rss.xml'
    ],
    business_news: [
        'https://feeds.content.dowjones.io/public/rss/WSJcomUSBusiness',
        'https://www.economist.com/business/rss.xml',
        'https://qz.com/feed'
    ],
    leadership_news: [
        'https://www.fastcompany.com/leadership/rss',
        'https://seths.blog/feed/',
        'https://leadershipfreak.blog/feed/'
    ]
};

// Source Authority Scores (1-10)
var SOURCE_AUTHORITY_SCORES = {
    'mit.edu': 10, 'stanford.edu': 10, 'wharton.upenn.edu': 10,
    'mckinsey.com': 9, 'hbr.org': 9, 'technologyreview.com': 9,
    'openai.com': 9, 'anthropic.com': 9, 'deepmind.com': 9,
    'techcrunch.com': 8, 'wired.com': 8, 'arstechnica.com': 8,
    'theverge.com': 7, 'wsj.com': 8, 'dowjones.io': 8,
    'economist.com': 8, 'qz.com': 7, 'fastcompany.com': 6,
    'seths.blog': 8, 'simonsinek.com': 8, 'leadershipfreak.blog': 7
};

// Groq API Key management
// Loaded from config.js (CONFIG.GROQ_API_KEY)
var groqApiKey = null;

// Load API key from config.js
function loadApiKey() {
    return new Promise(function(resolve) {
        // Use CONFIG from config.js if available
        if (typeof CONFIG !== 'undefined' && CONFIG.GROQ_API_KEY) {
            groqApiKey = CONFIG.GROQ_API_KEY;
            debugLog('API key loaded');
            resolve(groqApiKey);
        } else {
            debugLog('No API key configured');
            groqApiKey = null;
            resolve(null);
        }
    });
}

// Parse RSS XML to articles
function parseRSSXml(xmlText, sourceUrl) {
    var articles = [];
    try {
        var parser = new DOMParser();
        var xml = parser.parseFromString(xmlText, 'text/xml');

        // Try RSS 2.0 format first
        var items = xml.querySelectorAll('item');
        if (items.length === 0) {
            // Try Atom format
            items = xml.querySelectorAll('entry');
        }

        items.forEach(function(item, index) {
            if (index >= 10) return; // Limit to 10 per feed

            var title = item.querySelector('title');
            var link = item.querySelector('link');
            var description = item.querySelector('description, summary, content');
            var pubDate = item.querySelector('pubDate, published, updated');
            var source = xml.querySelector('channel > title, feed > title');

            // Handle Atom link format
            var linkHref = link ? (link.getAttribute('href') || link.textContent) : '';

            // Clean description (remove HTML tags for display)
            var descText = description ? description.textContent : '';
            descText = descText.replace(/<[^>]*>/g, '').substring(0, 300);

            articles.push({
                title: title ? title.textContent.trim() : 'Untitled',
                link: linkHref.trim(),
                description: descText.trim(),
                published: pubDate ? pubDate.textContent : '',
                source: source ? source.textContent.trim() : sourceUrl
            });
        });
    } catch (e) {
        console.error('Error parsing RSS:', e);
    }
    return articles;
}

// Fetch a single RSS feed
function fetchRSSFeed(url) {
    return new Promise(function(resolve) {
        var cacheBuster = Date.now();
        var fetchUrl = url + (url.includes('?') ? '&' : '?') + '_cb=' + cacheBuster;

        fetch(fetchUrl, {
            headers: {
                'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml'
            }
        })
        .then(function(response) {
            if (!response.ok) throw new Error('HTTP ' + response.status);
            return response.text();
        })
        .then(function(xmlText) {
            var articles = parseRSSXml(xmlText, url);
            debugLog('Fetched ' + articles.length + ' articles from ' + url);
            resolve(articles);
        })
        .catch(function(error) {
            console.warn('Failed to fetch ' + url + ':', error.message);
            resolve([]);
        });
    });
}

// Fetch all feeds for a category
function fetchCategoryFeeds(category) {
    var feeds = RSS_FEED_SOURCES[category] || [];
    var promises = feeds.map(function(url) {
        return fetchRSSFeed(url);
    });

    return Promise.all(promises).then(function(results) {
        // Flatten and dedupe by title
        var allArticles = [];
        var seenTitles = {};

        results.forEach(function(articles) {
            articles.forEach(function(article) {
                var titleLower = article.title.toLowerCase().trim();
                if (!seenTitles[titleLower]) {
                    seenTitles[titleLower] = true;
                    allArticles.push(article);
                }
            });
        });

        return allArticles;
    });
}

// Get source authority score
function getSourceScore(article) {
    var link = article.link || '';
    try {
        var url = new URL(link);
        var domain = url.hostname.replace('www.', '');

        // Check exact match
        if (SOURCE_AUTHORITY_SCORES[domain]) {
            return SOURCE_AUTHORITY_SCORES[domain];
        }

        // Check partial matches
        for (var source in SOURCE_AUTHORITY_SCORES) {
            if (domain.includes(source) || source.includes(domain)) {
                return SOURCE_AUTHORITY_SCORES[source];
            }
        }

        // Check TLDs
        if (domain.endsWith('.edu')) return 10;
        if (domain.endsWith('.gov')) return 10;

    } catch (e) {}
    return 5; // Default
}

// Calculate recency score (1-10)
function getRecencyScore(article) {
    var published = article.published;
    if (!published) return 5;

    try {
        var pubDate = new Date(published);
        var now = new Date();
        var daysOld = (now - pubDate) / (1000 * 60 * 60 * 24);

        // 10 for today, decreasing by 1.5 per day, minimum 1
        return Math.max(1, Math.round((10 - daysOld * 1.5) * 10) / 10);
    } catch (e) {
        return 5;
    }
}

// Call Groq API for relevance scoring
function getAIRelevanceScores(category, articles) {
    if (!groqApiKey || articles.length === 0) {
        // Return default scores if no API key
        var defaultScores = {};
        articles.forEach(function(art) {
            defaultScores[art.title] = 5;
        });
        return Promise.resolve(defaultScores);
    }

    var articleList = articles.slice(0, 15).map(function(art, i) {
        return (i + 1) + '. ' + art.title;
    }).join('\n');

    var categoryContext = {
        'ai_news': 'AI, machine learning, and technology innovation',
        'business_news': 'business strategy, digital transformation, and enterprise operations',
        'leadership_news': 'leadership development, management practices, and organizational culture'
    };

    var prompt = 'Rate each article\'s relevance (1-10) for an executive focused on ' +
        (categoryContext[category] || 'business') + '.\n\n' +
        'Articles:\n' + articleList + '\n\n' +
        'Respond ONLY with JSON like: {"1": 8, "2": 6, "3": 9}';

    return fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + groqApiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.2,
            max_tokens: 200
        })
    })
    .then(function(response) {
        if (!response.ok) throw new Error('Groq API error');
        return response.json();
    })
    .then(function(data) {
        var content = data.choices[0].message.content;
        var jsonMatch = content.match(/\{[^}]+\}/);
        if (jsonMatch) {
            var scores = JSON.parse(jsonMatch[0]);
            var result = {};
            articles.slice(0, 15).forEach(function(art, i) {
                result[art.title] = scores[String(i + 1)] || 5;
            });
            return result;
        }
        throw new Error('Invalid response');
    })
    .catch(function(error) {
        console.warn('AI scoring failed:', error.message);
        var defaultScores = {};
        articles.forEach(function(art) {
            defaultScores[art.title] = 5;
        });
        return defaultScores;
    });
}

// Generate executive summary using Groq
function generateSummary(category, articles) {
    if (!groqApiKey || articles.length === 0) {
        return Promise.resolve(null);
    }

    var articleText = articles.slice(0, 8).map(function(art) {
        return 'Title: ' + art.title + '\nDescription: ' + (art.description || '').substring(0, 200);
    }).join('\n\n');

    var categoryNames = {
        'ai_news': 'AI and Machine Learning',
        'business_news': 'Business Operations and Strategy',
        'leadership_news': 'Leadership and Management'
    };

    var prompt = 'Summarize these ' + (categoryNames[category] || category) +
        ' articles in 3-4 sentences for an executive. Focus on key trends and actionable insights.\n\n' +
        articleText + '\n\nProvide a brief, high-value summary:';

    return fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + groqApiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
            max_tokens: 300
        })
    })
    .then(function(response) {
        if (!response.ok) throw new Error('Groq API error');
        return response.json();
    })
    .then(function(data) {
        return data.choices[0].message.content.trim();
    })
    .catch(function(error) {
        console.warn('Summary generation failed:', error.message);
        return null;
    });
}

// Score and sort articles
function scoreAndSortArticles(category, articles, aiScores) {
    articles.forEach(function(article) {
        var aiScore = aiScores[article.title] || 5;
        var sourceScore = getSourceScore(article);
        var recencyScore = getRecencyScore(article);
        var combined = (aiScore * 0.5) + (sourceScore * 0.3) + (recencyScore * 0.2);

        article.scores = {
            ai_relevance: aiScore,
            source_authority: sourceScore,
            recency: recencyScore,
            combined: Math.round(combined * 100) / 100
        };
    });

    articles.sort(function(a, b) {
        return (b.scores.combined || 0) - (a.scores.combined || 0);
    });

    return articles;
}

// Fetch and process all news for a category
function fetchAndProcessCategory(category) {
    return fetchCategoryFeeds(category)
        .then(function(articles) {
            if (articles.length === 0) {
                return { articles: [], summary: null };
            }

            return getAIRelevanceScores(category, articles)
                .then(function(aiScores) {
                    var scoredArticles = scoreAndSortArticles(category, articles, aiScores);
                    return generateSummary(category, scoredArticles)
                        .then(function(summary) {
                            return {
                                articles: scoredArticles,
                                summary: summary,
                                article_count: scoredArticles.length,
                                sources: [...new Set(scoredArticles.map(function(a) { return a.source; }))]
                            };
                        });
                });
        });
}

// Helper: Convert timestamp to human-readable "time ago" format
function timeAgo(dateString) {
    if (!dateString) return '';

    try {
        var date = new Date(dateString);
        var now = new Date();
        var diffMs = now - date;
        var diffMins = Math.floor(diffMs / 60000);
        var diffHours = Math.floor(diffMs / 3600000);
        var diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return diffMins + ' minute' + (diffMins !== 1 ? 's' : '') + ' ago';
        if (diffHours < 24) return diffHours + ' hour' + (diffHours !== 1 ? 's' : '') + ' ago';
        if (diffDays < 7) return diffDays + ' day' + (diffDays !== 1 ? 's' : '') + ' ago';

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (e) {
        return '';
    }
}

// Helper: Escape HTML to prevent XSS (for use with innerHTML)
function escapeHTML(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Alias for backward compatibility
var sanitizeHTML = escapeHTML;

// Helper: Validate URL is safe (http/https only)
function isValidURL(str) {
    try {
        var url = new URL(str);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (e) {
        return false;
    }
}

// Helper: Safe URL for href attributes
function safeURL(str) {
    return isValidURL(str) ? str : '#';
}

// Helper: Truncate text with ellipsis
function truncateText(text, maxLength) {
    maxLength = maxLength || 300;
    if (!text || text.length <= maxLength) return text || '';
    return text.substring(0, maxLength).trim() + '...';
}

// Helper: Create a unique ID for an article
function getArticleId(article) {
    return article.link || article.title || '';
}

// Helper: Unicode-safe encoding for element IDs
function safeEncodeId(str) {
    try {
        return btoa(encodeURIComponent(str)).replace(/[^a-zA-Z0-9]/g, '');
    } catch (e) {
        // Fallback to simple hash for problematic strings
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return 'id' + Math.abs(hash);
    }
}

// Toggle article expansion
function toggleArticle(articleId) {
    var encodedId = safeEncodeId(articleId);
    var element = document.getElementById('article-' + encodedId);

    if (!element) return;

    var isExpanded = element.classList.contains('expanded');

    if (isExpanded) {
        element.classList.remove('expanded');
        state.expandedArticles = state.expandedArticles.filter(function(id) { return id !== articleId; });
    } else {
        element.classList.add('expanded');
        if (state.expandedArticles.indexOf(articleId) === -1) {
            state.expandedArticles.push(articleId);
        }
        if (state.viewedArticles.indexOf(articleId) === -1) {
            state.viewedArticles.push(articleId);
            element.classList.add('viewed');
        }
    }

    saveState();
}

// Load news by fetching live RSS feeds
function loadNews() {
    // Check if we have cached news data for today
    if (dailyCache && dailyCache.newsData) {
        debugLog('Using cached news data');
        summaryData = dailyCache.newsData;
        renderNewsSectionFromCache();
        return;
    }

    // Show loading state
    var newsContainers = ['aiNewsDisplay', 'businessNewsDisplay', 'leadershipNewsDisplay'];
    newsContainers.forEach(function(id) {
        var container = document.getElementById(id);
        if (container) {
            container.innerHTML = '<p style="color: var(--text-tertiary); text-align: center; padding: 2rem;">Fetching live news from RSS feeds...</p>';
        }
    });

    debugLog('Fetching live RSS feeds...');

    // Fetch all three categories in parallel
    var categories = ['ai_news', 'business_news', 'leadership_news'];
    var displayIds = ['aiNewsDisplay', 'businessNewsDisplay', 'leadershipNewsDisplay'];

    // Process each category
    categories.forEach(function(category, index) {
        fetchAndProcessCategory(category)
            .then(function(categoryData) {
                debugLog('Processed ' + category + ': ' + categoryData.articles.length + ' articles');

                // Store in summaryData structure
                if (!summaryData) {
                    summaryData = { generated_at: new Date().toISOString(), summaries: {} };
                }
                summaryData.summaries[category] = categoryData;

                // Render this section
                renderNewsSection(displayIds[index], category, categoryData);

                // Cache after all categories are done
                if (summaryData.summaries.ai_news && summaryData.summaries.business_news && summaryData.summaries.leadership_news) {
                    if (dailyCache) {
                        dailyCache.newsData = summaryData;
                        saveDailyCache();
                        debugLog('News data cached');
                    }
                }
            })
            .catch(function(error) {
                console.error('Error fetching ' + category + ':', error);
                renderNewsSection(displayIds[index], category, null);
            });
    });
}

// Render news sections from cached data
function renderNewsSectionFromCache() {
    if (summaryData && summaryData.summaries) {
        renderNewsSection('aiNewsDisplay', 'ai_news', summaryData.summaries.ai_news);
        renderNewsSection('businessNewsDisplay', 'business_news', summaryData.summaries.business_news);
        renderNewsSection('leadershipNewsDisplay', 'leadership_news', summaryData.summaries.leadership_news);
    } else {
        renderNewsSection('aiNewsDisplay', 'ai_news', null);
        renderNewsSection('businessNewsDisplay', 'business_news', null);
        renderNewsSection('leadershipNewsDisplay', 'leadership_news', null);
    }
}

// Render a single article item (no inline handlers)
function renderArticleItem(article) {
    var articleId = getArticleId(article);
    var encodedId = safeEncodeId(articleId);
    var isViewed = state.viewedArticles.indexOf(articleId) !== -1;
    var isExpanded = state.expandedArticles.indexOf(articleId) !== -1;
    var timeAgoStr = timeAgo(article.published);
    var description = escapeHTML(article.description || article.summary || '');
    var displayDescription = description || 'No description available.';
    var articleLink = safeURL(article.link || article.url || '');

    // Score badge (only show if scores exist)
    var scoreBadge = '';
    if (article.scores && article.scores.combined) {
        scoreBadge = '<span class="article-score-badge">' + article.scores.combined.toFixed(1) + '</span>';
    }

    return '<div id="article-' + encodedId + '" class="news-item ' + (isViewed ? 'viewed' : '') + ' ' + (isExpanded ? 'expanded' : '') + '">' +
        '<div class="news-header" data-article-id="' + escapeHTML(articleId) + '">' +
            '<span class="expand-icon">&#9654;</span>' +
            '<div class="news-content">' +
                '<div class="news-title">' +
                    '<a href="' + articleLink + '" target="_blank" rel="noopener noreferrer">' + escapeHTML(article.title) + '</a>' +
                    scoreBadge +
                '</div>' +
                '<div style="font-size: 0.8rem; color: var(--text-tertiary); margin-top: 0.35rem;">' +
                    escapeHTML(article.source) + (timeAgoStr ? ' - ' + timeAgoStr : '') +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="news-description">' +
            '<p class="news-description-text">' + truncateText(displayDescription, 400) + '</p>' +
            '<a href="' + articleLink + '" class="read-full-link" target="_blank" rel="noopener noreferrer">Read Full Article &rarr;</a>' +
        '</div>' +
    '</div>';
}

// Toggle more articles visibility
function toggleMoreArticles(categoryKey) {
    var toggle = document.getElementById('more-toggle-' + categoryKey);
    var container = document.getElementById('more-articles-' + categoryKey);

    if (toggle && container) {
        toggle.classList.toggle('expanded');
        container.classList.toggle('expanded');
    }
}

// Render a complete news section with summary and articles (top 3 + collapsible rest)
function renderNewsSection(elementId, categoryKey, categoryData) {
    var container = document.getElementById(elementId);
    var html = '';

    if (categoryData && categoryData.summary) {
        var generatedAt = summaryData && summaryData.generated_at
            ? new Date(summaryData.generated_at).toLocaleString('en-US', {
                month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
              })
            : 'Unknown';
        var articleCount = categoryData.article_count || (categoryData.articles ? categoryData.articles.length : 0);

        html += '<div class="executive-summary">' +
            '<div class="executive-summary-header">' +
                '<span class="executive-summary-title">Executive Summary</span>' +
                '<span class="executive-summary-meta">' + articleCount + ' articles - Generated ' + generatedAt + '</span>' +
            '</div>' +
            '<p class="executive-summary-text">' + sanitizeHTML(categoryData.summary) + '</p>' +
        '</div>';
    } else {
        html += '<div class="summary-unavailable">' +
            '<p class="summary-unavailable-text">Add a Groq API key to enable AI-powered executive summaries.</p>' +
            '<button class="btn-secondary show-instructions-btn">Configure API Key</button>' +
        '</div>';
    }

    var articles = (categoryData && categoryData.articles) ? categoryData.articles : (FALLBACK_NEWS[categoryKey] || []);

    // Split into top 3 and the rest
    var topArticles = articles.slice(0, 3);
    var moreArticles = articles.slice(3);

    // Render top 3 articles
    html += '<div class="top-articles-section">';
    topArticles.forEach(function(article) {
        html += renderArticleItem(article);
    });
    html += '</div>';

    // Render remaining articles in collapsible section
    if (moreArticles.length > 0) {
        html += '<button id="more-toggle-' + categoryKey + '" class="more-articles-toggle" data-category="' + categoryKey + '">' +
            '<span class="toggle-icon">&#9660;</span>' +
            '<span>' + moreArticles.length + ' more article' + (moreArticles.length > 1 ? 's' : '') + '</span>' +
        '</button>';

        html += '<div id="more-articles-' + categoryKey + '" class="more-articles-container">';
        moreArticles.forEach(function(article) {
            html += renderArticleItem(article);
        });
        html += '</div>';
    }

    container.innerHTML = html;
}

// Show API key settings modal
function showRegenerateInstructions() {
    var hasKey = groqApiKey ? true : false;
    var maskedKey = hasKey ? groqApiKey.substring(0, 8) + '...' + groqApiKey.substring(groqApiKey.length - 4) : '';

    var modal = document.createElement('div');
    modal.id = 'instructions-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:1000;';

    var content = '<div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:12px;padding:2rem;max-width:500px;margin:1rem;">' +
        '<h3 style="font-family:var(--font-display);margin-bottom:1.5rem;color:var(--accent-amber);">News Settings</h3>';

    if (hasKey) {
        content += '<p style="color:var(--success);margin-bottom:1rem;">API key configured: ' + maskedKey + '</p>' +
            '<p style="color:var(--text-secondary);margin-bottom:1.5rem;">AI-powered executive summaries and relevance scoring are enabled.</p>';
    } else {
        content += '<p style="color:var(--text-secondary);margin-bottom:1rem;">To enable AI-powered summaries, add your Groq API key to <code style="background:var(--bg-primary);padding:0.2rem 0.4rem;border-radius:4px;">config.js</code>:</p>' +
            '<pre style="background:var(--bg-primary);padding:1rem;border-radius:6px;margin-bottom:1rem;overflow-x:auto;font-size:0.85rem;color:var(--text-secondary);">var CONFIG = {\n    GROQ_API_KEY: \'your_key_here\'\n};</pre>' +
            '<p style="color:var(--text-tertiary);font-size:0.85rem;margin-bottom:1.5rem;">Get a free key at <a href="https://console.groq.com/keys" target="_blank" style="color:var(--accent-cyan);">console.groq.com/keys</a></p>';
    }

    content += '<button class="btn instructions-modal-close">Got it</button>' +
        '</div>';

    modal.innerHTML = content;
    document.body.appendChild(modal);
}

function closeInstructionsModal() {
    var modal = document.getElementById('instructions-modal');
    if (modal) {
        modal.remove();
    }
}

// Reflection - Show question in dashboard, button opens input modal
function loadDailyReflection() {
    // Guard against empty data array
    if (REFLECTIONS.length === 0) {
        var questionDisplay = document.getElementById('reflectionQuestionDisplay');
        if (questionDisplay) {
            questionDisplay.innerHTML = '<p style="color: var(--text-tertiary);">No reflections available.</p>';
        }
        return;
    }

    var today = new Date().toISOString().split('T')[0];

    // Check if we already have a saved reflection for today
    if (state.reflections[today]) {
        state.currentReflection = { question: state.reflections[today].question };
        renderReflectionQuestion(state.reflections[today].question);
        renderReflectionModal(state.reflections[today].question, state.reflections[today].response);
        return;
    }

    // Check if we have a cached reflection question for today (even without saved response)
    if (dailyCache && dailyCache.reflection) {
        var reflection = dailyCache.reflection;
        state.currentReflection = reflection;
        renderReflectionQuestion(reflection.question);
        renderReflectionModal(reflection.question, '');
        return;
    }

    // Get a new reflection question
    var available = REFLECTIONS.filter(function(r) { return state.seenReflections.indexOf(r.id) === -1; });
    if (available.length === 0) {
        state.seenReflections = [];
        available = REFLECTIONS; // Use full array instead of recursion
    }

    var reflection = available[Math.floor(Math.random() * available.length)];
    state.currentReflection = reflection;
    state.seenReflections.push(reflection.id);
    saveState();

    // Cache the reflection question for today
    if (dailyCache) {
        dailyCache.reflection = reflection;
        saveDailyCache();
    }

    renderReflectionQuestion(reflection.question);
    renderReflectionModal(reflection.question, '');
}

// Render the reflection question in the dashboard (always visible)
function renderReflectionQuestion(question) {
    var questionDisplay = document.getElementById('reflectionQuestionDisplay');
    if (questionDisplay) {
        questionDisplay.innerHTML = '<p class="reflection-question">' + question + '</p>';
    }
}

// Render the reflection modal content (input area)
function renderReflectionModal(question, savedResponse) {
    var modalContent = document.getElementById('reflectionModalContent');
    if (modalContent) {
        var lastSavedText = '';
        var today = new Date().toISOString().split('T')[0];
        if (state.reflections[today] && state.reflections[today].timestamp) {
            lastSavedText = '<p style="color: var(--text-tertiary); font-size: 0.85rem; margin-top: 1rem;">Last saved: ' + new Date(state.reflections[today].timestamp).toLocaleString() + '</p>';
        }

        modalContent.innerHTML =
            '<p class="reflection-question" style="margin-bottom: 1.5rem;">' + question + '</p>' +
            '<textarea id="reflectionText" class="reflection-textarea" placeholder="Take your time... this is for you.">' + (savedResponse || '') + '</textarea>' +
            '<div class="reflection-actions" style="margin-top: 1rem;">' +
                '<button class="btn save-reflection-btn">' + (savedResponse ? 'Update Reflection' : 'Save Reflection') + '</button>' +
                '<button class="btn export-reflections-btn">Export as Markdown</button>' +
            '</div>' +
            lastSavedText;
    }
}

function saveReflection() {
    var today = new Date().toISOString().split('T')[0];
    var textArea = document.getElementById('reflectionText');
    var text = textArea ? textArea.value : '';

    if (!text.trim()) {
        alert('Please write something before saving');
        return;
    }

    state.reflections[today] = {
        question: state.currentReflection.question,
        response: text,
        timestamp: new Date().toISOString()
    };

    saveState();
    updateReflectionTrigger();
    renderReflectionModal(state.currentReflection.question, text);
    alert('Reflection saved!');
}

// Reflection Modal Functions
function openReflectionModal() {
    document.getElementById('reflectionModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    // Focus on textarea
    var textArea = document.getElementById('reflectionText');
    if (textArea) {
        textArea.focus();
    }
}

function closeReflectionModal() {
    var modal = document.getElementById('reflectionModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateReflectionTrigger() {
    var today = new Date().toISOString().split('T')[0];
    var trigger = document.getElementById('reflectionTrigger');
    if (!trigger) return;

    var hasResponse = state.reflections[today] && state.reflections[today].response;

    if (hasResponse) {
        trigger.classList.add('has-response');
        trigger.innerHTML = '<span>&#10003; View/Edit Reflection</span>';
    } else {
        trigger.classList.remove('has-response');
        trigger.innerHTML = '<span>Write Reflection</span>';
    }
}

function exportReflections() {
    var entries = Object.entries(state.reflections).sort(function(a, b) { return b[0].localeCompare(a[0]); });

    if (entries.length === 0) {
        alert('No reflections to export');
        return;
    }

    var markdown = '# Daily Reflections\n\n';
    entries.forEach(function(entry) {
        var date = entry[0];
        var data = entry[1];
        var formatted = new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        markdown += '## ' + formatted + '\n\n';
        markdown += '**Question:** ' + data.question + '\n\n';
        markdown += data.response + '\n\n';
        markdown += '---\n\n';
    });

    var blob = new Blob([markdown], { type: 'text/markdown' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'reflections-' + new Date().toISOString().split('T')[0] + '.md';
    a.click();
    URL.revokeObjectURL(url);
}

// Start App
window.addEventListener('DOMContentLoaded', init);
