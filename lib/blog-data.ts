export interface BlogPost {
    id: string
    slug: string
    category: string
    categoryId: string
    title: string
    author: string
    date: string
    image: string
    excerpt: string
    content: string
}

export const CATEGORIES = [
    { id: "all", name: "All Categories", description: "" },
    { id: "salesbook", name: "The Daring Salesbook", description: "Sales frameworks, prospecting strategies, objection handling, personal branding for realtors and lessons from our bootcamp/training sessions." },
    { id: "community", name: "Community Hub", description: "Realtor journeys & testimonials, student transformation stories, before/after growth narratives." },
    { id: "insights", name: "Real Estate Insights", description: "Real estate fundamentals, definitions & explanations — a go-to learning hub of what real estate is all about." },
    { id: "daring", name: "What's Daring?", description: "Announcement hub for Daring Tribe including bootcamps, trainings, hangouts, and Daring Tribe closers for the month." },
]

export const BLOG_DATA: BlogPost[] = [
    // JANUARY
    {
        id: "01",
        slug: "your-daring-corner-of-the-internet",
        categoryId: "daring",
        category: "What's Daring?",
        title: "Your Daring Corner of the Internet",
        author: "Opemipo Akingbade",
        date: "JANUARY 2025",
        image: "/tribe-action.jpg",
        excerpt: "Hey there! You found us! If you're here, then you're daring to be the better version of yourself.",
        content: `Hey there! You found us!
If you're here, then you're daring to be the better version of yourself.

You're probably here because you want to learn real estate properly, figure out sales as you go or get exposed to opportunities that can champion your next level.

So here we are. Welcome to the Daring Tribe website!
It's a whole experience of learning, earning and winning.

**So… What Now?**

Join the tribe.
- Explore
- Read
- Bookmark
- Come back

Signed, your daring corner of the internet.`
    },
    {
        id: "02",
        slug: "inside-the-daring-tribe-salesbook",
        categoryId: "salesbook",
        category: "The Daring Salesbook",
        title: "Inside the Daring Tribe Salesbook",
        author: "Sinmiloluwa Oyemakinde",
        date: "JANUARY 2025",
        image: "/modern-luxury-office-interior-with-floor-to-ceilin.jpg",
        excerpt: "Sales is often misunderstood. At the Daring Tribe, we see sales differently. Sales is a skill. A process. And most importantly, a transfer of value.",
        content: `Sales is often misunderstood.
Some people think it's about convincing people to buy things they don't need.
A few think it's talent, you either have it or you don't.
At the Daring Tribe, we see sales differently.

Sales is a skill.
A process.
And most importantly, a transfer of value.

That belief is the very foundation of the Daring Salesbook, learning about our strategies and what sets us apart as Daring.

**First Things First: We Sell Value, Not Noise**

If you don't understand the value of what you're selling, you can't sell it confidently.
Our estates are not positioned as "just land" or "mere listings"

They are:
- Solutions to real housing needs
- Assets with long-term relevance
- Developments backed by clear purpose and structure

That's why our sales approach starts with understanding the product deeply and the value we have to offer.

**Grab Your Salesbook, Training is in Session..**

We provide training that prepares you for real world conversations built around actual field experience and ultimately how to convert conversations into decisions.

Our approach provides you the power of selling built with structure, and there's only one way to find out..

Be a part of the tribe, and enjoy much more from the daring salesbook.`
    },
    // FEBRUARY
    {
        id: "03",
        slug: "realtors-guide-to-identifying-land-size",
        categoryId: "insights",
        category: "Real Estate Insights",
        title: "A Realtor's Guide to Identifying Land Size Without Guesswork",
        author: "Janet Oladokun",
        date: "FEBRUARY 2025",
        image: "/property-detail.jpg",
        excerpt: "Have you ever been in that situation where you're on a site inspection, the client turns to you and asks: 'So… how big is this land?' And for a split second, your mind goes blank.",
        content: `Have you ever been in that situation where you're on a site inspection, the client turns to you and asks: "So… how big is this land?"
And for a split second, your mind goes blank.

If you're wondering how this scenario ends, then stick around.

Land size confusion is one of the most common moments realtors and clients face which is one of the quickest ways to lose confidence if not handled properly.

This isn't about looking experienced.
It's about being accurate.

**First: Why Land Size Matters**

Land size affects the price of the property, what they can build, the long-term value and resale potentials; and it starts from understanding the basics of land sizes properly.

**Understanding the Basics (Properly This Time)**

Land size is measured in square metres (sqm) which is the global standard.
In Nigeria, what people casually call "a plot" is not universal.

Depending on different locations, a "plot" could be:
- 450 sqm
- 500 sqm
- 600 sqm

That's why relying on the word plot alone is risky.

**The Most Common Land Sizes You'll Encounter**

Here's what you should know offhand:
- 300 sqm: Often considered half-plot in many estates
- 450–500 sqm: Common residential size
- 600 sqm: Traditional "full plot" in some locations
- 1,000+ sqm: Large residential or semi-commercial

Knowing these numbers helps you visualize space, explain the differences and buyers are matched to the right option.

**So… Can You Actually Tell Land Size Just by Looking?**

Short answer: Yes, approximately.
And no, it's not magic.

Let's paint some common scenarios.

**What Can Comfortably Fit on Common Land Sizes in Nigeria**

Think of this as a mental reference chart you carry with you.

**150 sqm**
Best for: Compact studio apartment, Mini 1-bedroom unit, Small shop / kiosk (commercial zones)
This size is about function and not flexibility.

**250 sqm**
Best for: Comfortable 2-bedroom bungalow, Small carefully planned 3-bedroom bungalow
You build here with intention, and not excess.

**300 sqm**
Best for: Standard 3-bedroom bungalow, Carefully planned Compact duplex, usually popular in estates and has room for basic parking and setbacks

**450 sqm**
Best for: Standard duplex, Spacious 3–4 bedroom bungalow and Small block of flats (2–3 units, depending on layout)
This is the sweet spot for many buyers.

In the final analysis, instead of guessing, think:
- What category does this land fall into?
- What fits comfortably, not forcefully?
- Does the survey confirm this size?

That's how you start figuring out land sizes, one property at a time.`
    },
    {
        id: "04",
        slug: "my-growth-story",
        categoryId: "community",
        category: "Community Hub",
        title: "Before 1159 Realty vs After: My Growth Story",
        author: "Daring Tribe Member",
        date: "FEBRUARY 2025",
        image: "/successful-real-estate-team-celebration.jpg",
        excerpt: "Five Years of 1159 Realty, 1 year of my Personal Journey. A transformation story from the community.",
        content: `Five Years of 1159 Realty, 1 year of my Personal Journey.

*Coming soon...*

This is a story of growth, transformation, and what it means to be part of the Daring Tribe community.

Stay tuned for the full story.`
    },
    {
        id: "05",
        slug: "baj-villa-new-estate-alert",
        categoryId: "daring",
        category: "What's Daring?",
        title: "BAJ Villa Has Entered the Chat: New Estate Alert!",
        author: "Daring Tribe",
        date: "FEBRUARY 2025",
        image: "/villa.jpg",
        excerpt: "New Estate Alert! BAJ Villa has officially joined the Daring Tribe portfolio.",
        content: `New Estate Alert!

BAJ Villa has officially joined the Daring Tribe portfolio.

*More details coming soon...*

Stay tuned for the full announcement about this exciting new addition to our estate offerings.`
    },
    // MARCH
    {
        id: "06",
        slug: "prospecting-101",
        categoryId: "salesbook",
        category: "The Daring Salesbook",
        title: "Prospecting 101: How Top Realtors Actually Find Clients",
        author: "Emerald Akinjayeju",
        date: "MARCH 2025",
        image: "/prospecting.jpg",
        excerpt: "Success in real estate isn't about waiting for the phone to ring; it's about knowing whose phone to ring.",
        content: `Success in real estate isn't about waiting for the phone to ring; it's about knowing whose phone to ring.

*Full article coming soon...*

Emerald Akinjayeju breaks down the frameworks used by the top realtors to find high-value clients without 'chasing' them.

Stay tuned for the complete guide on prospecting strategies that actually work.`
    },
    {
        id: "07",
        slug: "q1-deal-closers",
        categoryId: "daring",
        category: "What's Daring?",
        title: "This Is What Daring Looks Like ft Q1 Deal Closers",
        author: "Daring Tribe",
        date: "MARCH 2025",
        image: "/modern-luxury-residential-development-aerial-view.jpg",
        excerpt: "Celebrating our top performers who closed deals in Q1. See who made the list!",
        content: `This Is What Daring Looks Like!

Featuring our Q1 Deal Closers.

*Coming soon...*

Every quarter, we recognize the realtors in our community who have demonstrated exceptional performance. These are the closers who are setting the pace for others to follow.

Stay tuned to see who made the list and learn from their winning strategies.`
    },
]

export function getBlogPost(slug: string): BlogPost | undefined {
    return BLOG_DATA.find(post => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, categoryId: string, limit: number = 3): BlogPost[] {
    return BLOG_DATA
        .filter(post => post.slug !== currentSlug && post.categoryId === categoryId)
        .slice(0, limit)
}

export function getCategoryById(id: string) {
    return CATEGORIES.find(cat => cat.id === id)
}
