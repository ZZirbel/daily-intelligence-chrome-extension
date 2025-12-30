// Leadership Insights - 60 Total
// Distribution: Visionary (12), Empowering (12), Decisive (10), Coaching (8), Strategic (6), Technical (5), Change (3), Team (2), Communication (2)

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
            { title: "HBR: The Science of Innovation", url: "https://hbr.org/2019/05/the-science-of-innovation" }
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
            { title: "HBR: Leading Clever People", url: "https://hbr.org/2010/03/leading-clever-people" }
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
            { title: "HBR: Strategies for Learning from Failure", url: "https://hbr.org/2011/04/strategies-for-learning-from-failure" }
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
            { title: "HBR: The Decision-Driven Organization", url: "https://hbr.org/2010/06/the-decision-driven-organization" }
        ]
    },
    {
        id: 26,
        insight: "Distinguish between reversible and irreversible decisions. Reversible decisions should be made fast and low in the organization. Irreversible decisions deserve more deliberation and senior involvement.",
        category: "Decisive Action",
        sources: [
            { title: "Amazon Leadership Principles", url: "https://www.aboutamazon.com/about-us/leadership-principles" },
            { title: "HBR: What the Best Strategic Leaders Do", url: "https://hbr.org/2019/03/what-the-best-strategic-leaders-do" }
        ]
    },
    {
        id: 27,
        insight: "Analysis paralysis is fear wearing a productivity mask. When you find yourself asking for 'just one more data point,' check if you're seeking information or avoiding decision.",
        category: "Decisive Action",
        sources: [
            { title: "Thinking, Fast and Slow - Daniel Kahneman", url: "https://www.penguinrandomhouse.com/books/89308/thinking-fast-and-slow-by-daniel-kahneman/" },
            { title: "HBR: Why Good Leaders Make Bad Decisions", url: "https://hbr.org/2009/02/why-good-leaders-make-bad-decisions" }
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
            { title: "HBR: The Hidden Traps in Decision Making", url: "https://hbr.org/1998/09/the-hidden-traps-in-decision-making-2" }
        ]
    },
    {
        id: 31,
        insight: "The leader's job is often to break ties, not to make every decision. Create processes for the 80% of decisions that don't need you, and preserve your attention for the 20% that do.",
        category: "Decisive Action",
        sources: [
            { title: "The Effective Executive - Peter Drucker", url: "https://www.drucker.institute/books/the-effective-executive/" },
            { title: "HBR: Stop Overcomplicating It", url: "https://hbr.org/2020/09/stop-overcomplicating-it-the-simple-guidebook-to-upping-your-management-game" }
        ]
    },
    {
        id: 32,
        insight: "Document the decision, not just the outcome. Future you (and your team) will want to know why you decided X. Decision logs prevent re-litigation and accelerate organizational learning.",
        category: "Decisive Action",
        sources: [
            { title: "Architecture Decision Records", url: "https://adr.github.io/" },
            { title: "HBR: How to Make Good Decisions", url: "https://hbr.org/2009/09/how-to-make-good-decisions" }
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
            { title: "Co-Active Coaching - Henry Kimsey-House", url: "https://coactive.com/resources/co-active-coaching-book/" }
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
            { title: "HBR: The Importance of Building Confidence", url: "https://hbr.org/2020/09/the-importance-of-building-confidence" }
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
            { title: "Crucial Conversations - Kerry Patterson", url: "https://cruciallearning.com/crucial-conversations-book/" }
        ]
    },
    // Strategic Execution (6 insights)
    {
        id: 43,
        insight: "Strategy without execution is hallucination. Execution without strategy is chaos. Your job is to hold both—ensuring the big picture translates into daily actions that compound over time.",
        category: "Strategic Execution",
        sources: [
            { title: "Execution - Larry Bossidy", url: "https://www.penguinrandomhouse.com/books/10098/execution-by-larry-bossidy-and-ram-charan/" },
            { title: "HBR: Stop Distinguishing Between Execution and Strategy", url: "https://hbr.org/2017/12/stop-distinguishing-between-execution-and-strategy" }
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
            { title: "HBR: Leading Change", url: "https://hbr.org/2010/03/leading-change-lessons-from-lt" }
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
            { title: "HBR: The High-Velocity IT Operating Model", url: "https://hbr.org/2019/06/the-high-velocity-it-operating-model" }
        ]
    },
    {
        id: 50,
        insight: "Your architecture should evolve at the rate your business needs. Over-engineering for hypothetical scale is as costly as under-engineering for actual scale. Design for the next 18 months, not the next decade.",
        category: "Technical Leadership",
        sources: [
            { title: "Building Evolutionary Architectures - Neal Ford", url: "https://www.oreilly.com/library/view/building-evolutionary-architectures/9781492097532/" },
            { title: "HBR: Why Strategy Execution Unravels", url: "https://hbr.org/2015/03/why-strategy-execution-unravelsand-what-to-do-about-it" }
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
            { title: "HBR: The Overlooked Key to a Successful Scale-Up", url: "https://hbr.org/2021/01/the-overlooked-key-to-a-successful-scale-up" }
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
            { title: "The Power of Positive Deviance - Richard Pascale", url: "https://www.bkconnection.com/books/title/The-Power-of-Positive-Deviance" }
        ]
    },
    // Team Dynamics (2 insights)
    {
        id: 57,
        insight: "Psychological safety isn't about being nice—it's about being able to take risks without fear of punishment. High-performing teams fight hard about ideas but never make it personal.",
        category: "Team Dynamics",
        sources: [
            { title: "The Fearless Organization - Amy Edmondson", url: "https://fearlessorganization.com/" },
            { title: "HBR: High-Performing Teams Need Psychological Safety", url: "https://hbr.org/2017/08/high-performing-teams-need-psychological-safety-heres-how-to-create-it" }
        ]
    },
    {
        id: 58,
        insight: "The best indicator of team health is how they handle conflict. Healthy teams surface disagreements early, argue productively, and commit to outcomes. Unhealthy teams avoid conflict—then explode or disengage.",
        category: "Team Dynamics",
        sources: [
            { title: "The Five Dysfunctions of a Team - Patrick Lencioni", url: "https://www.tablegroup.com/product/the-five-dysfunctions-of-a-team/" },
            { title: "HBR: How to Design Effective Meetings", url: "https://hbr.org/2018/04/how-to-design-an-agenda-for-an-effective-meeting" }
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
