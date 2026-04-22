export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  categoryId: string;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export const CATEGORIES = [
  { id: "all", name: "All Categories", description: "" },
  {
    id: "salesbook",
    name: "The Daring Salesbook",
    description:
      "Sales frameworks, prospecting strategies, objection handling, personal branding for realtors and lessons from our bootcamp/training sessions.",
  },
  {
    id: "community",
    name: "Community Hub",
    description:
      "Realtor journeys & testimonials, student transformation stories, before/after growth narratives.",
  },
  {
    id: "insights",
    name: "Real Estate Insights",
    description:
      "Real estate fundamentals, definitions & explanations — a go-to learning hub of what real estate is all about.",
  },
  {
    id: "daring",
    name: "What's Daring?",
    description:
      "Announcement hub for Daring Tribe including bootcamps, trainings, hangouts, and Daring Tribe closers for the month.",
  },
];

export const BLOG_DATA: BlogPost[] = [
  // JANUARY
  {
    id: "01",
    slug: "your-daring-corner-of-the-internet",
    categoryId: "daring",
    category: "What's Daring?",
    title: "Your Daring Corner of the Internet",
    author: "Opemipo Akingbade",
    date: "JANUARY 2026",
    image: "/tribe-action.jpg",
    excerpt:
      "Hey there! You found us! If you're here, then you're daring to be the better version of yourself.",
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

Signed, your daring corner of the internet.`,
  },
  {
    id: "02",
    slug: "inside-the-daring-tribe-salesbook",
    categoryId: "daring",
    category: "What's Daring?",
    title: "YOUR NEXT BIG SALE",
    author: "",
    date: "JANUARY 2026",
    image: "/cisca1.png",
    excerpt:
      "Realtors, listen up something exciting has just arrived in Agbowo, Ibadan, and it’s the kind of project you’ll want to show every client. Cisca Villa isn’t just another apartment complex,   it’s a bold statement in modern living and smart investment for young professionals. From design to location, this estate is built to sell itself but you’ll need to guide clients to see why it’s a move they can’t miss.",
    content: `

**Sell the Experience, Not Just the Apartment**

Cisca Villa isn’t your typical estate. Think fully furnished room-and-parlour apartments that combine comfort, style, and practicality. Every detail is intentional rooftop gardens for relaxation, heat extraction ventilation systems for comfort, solar-powered energy for stability, biometric fingerprint access for security, CCTV monitoring, and 24/7 water supply.

When showing clients, emphasize this: it’s a complete living experience, not just four walls. Young professionals want more than a place to sleep they want a home that reflects their lifestyle, their ambition, and their taste. This is where you can position Cisca Villa as a must-have for modern living.

 

**LOCATION SELLS ITSELF**

Location is everything, and Cisca Villa nails it. Agbowo, Ibadan is vibrant, accessible, and close to universities, business hubs, and everyday conveniences. For young professionals, this is huge: short commutes, easy access to social spots, and a thriving community.

When pitching, highlight how this estate balances privacy, connectivity, and lifestyle. Investors will immediately recognize the long-term value because location drives both rental income and property appreciation.

 

**POSITIONING IT AS A SMART INVESTMENT**

Here’s where you close the deal: Cisca Villa isn’t just about luxury living it’s about earning while owning. Apartments here are built to grow in value and generate yearly returns for young professionals. Whether they rent it out or live in it, they’re making a financial move that pays off.

You can say: “Invest in an apartment today, and it earns for you tomorrow. Passive income while your property appreciates. Comfort, convenience, and long-term growth   all in one place.”

Realtors, this is your angle: sell opportunity, wealth-building, and security, not just the apartment. Cisca Villa is made for the new generation of investors who understand that real estate is more than accommodation it’s a pathway to financial freedom.

Guide your clients through this story, and watch how quickly they see the value. Agbowo is about to feel the difference, and your clients’ bank accounts will too.`,
  },
  {
    id: "03",
    slug: "inside-the-daring-tribe-salesbook",
    categoryId: "salesbook",
    category: "The Daring Salesbook",
    title: "Inside the Daring Tribe Salesbook",
    author: "Sinmiloluwa Oyemakinde",
    date: "JANUARY 2025",
    image: "/modern-luxury-office-interior-with-floor-to-ceilin.jpg",
    excerpt:
      "Sales is often misunderstood. At the Daring Tribe, we see sales differently. Sales is a skill. A process. And most importantly, a transfer of value.",
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

  Be a part of the tribe, and enjoy much more from the daring salesbook.`,
  },
  // FEBRUARY
  {
    id: "04",
    slug: "realtors-guide-to-identifying-land-size",
    categoryId: "insights",
    category: "Real Estate Insights",
    title: "A Realtor's Guide to Identifying Land Size Without Guesswork",
    author: "Janet Oladokun",
    date: "FEBRUARY 2025",
    image: "/property-detail.jpg",
    excerpt:
      "Have you ever been in that situation where you're on a site inspection, the client turns to you and asks: 'So… how big is this land?' And for a split second, your mind goes blank.",
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

  That's how you start figuring out land sizes, one property at a time.`,
  },
  {
    id: "05",
    slug: "my-growth-story",
    categoryId: "community",
    category: "Community Hub",
    title: "Before 1159 Realty vs After: My Growth Story",
    author: "Daring Tribe Member",
    date: "FEBRUARY 2025",
    image: "/successful-real-estate-team-celebration.jpg",
    excerpt:
      "Five Years of 1159 Realty, 1 year of my Personal Journey. A transformation story from the community.",
    content: `Five Years of 1159 Realty, 1 year of my Personal Journey.

  *Coming soon...*

  This is a story of growth, transformation, and what it means to be part of the Daring Tribe community.

  Stay tuned for the full story.`,
  },
  {
    id: "06",
    slug: "baj-villa-new-estate-alert",
    categoryId: "daring",
    category: "What's Daring?",
    title: "BAJ Villa Has Entered the Chat: New Estate Alert!",
    author: "Daring Tribe",
    date: "FEBRUARY 2025",
    image: "/villa.jpg",
    excerpt:
      "New Estate Alert! BAJ Villa has officially joined the Daring Tribe portfolio.",
    content: `New Estate Alert!

  BAJ Villa has officially joined the Daring Tribe portfolio.

  *More details coming soon...*

  Stay tuned for the full announcement about this exciting new addition to our estate offerings.`,
  },
  // MARCH
  {
    id: "07",
    slug: "prospecting-101",
    categoryId: "salesbook",
    category: "The Daring Salesbook",
    title: "Prospecting 101: How Top Realtors Actually Find Clients",
    author: "Emerald Akinjayeju",
    date: "MARCH 2025",
    image: "/prospecting.jpg",
    excerpt:
      "Success in real estate isn't about waiting for the phone to ring; it's about knowing whose phone to ring.",
    content: `Success in real estate isn't about waiting for the phone to ring; it's about knowing whose phone to ring.

  *Full article coming soon...*

  Emerald Akinjayeju breaks down the frameworks used by the top realtors to find high-value clients without 'chasing' them.

  Stay tuned for the complete guide on prospecting strategies that actually work.`,
  },
  {
    id: "08",
    slug: "q1-deal-closers",
    categoryId: "daring",
    category: "What's Daring?",
    title: "This Is What Daring Looks Like ft Q1 Deal Closers",
    author: "Daring Tribe",
    date: "MARCH 2025",
    image: "/modern-luxury-residential-development-aerial-view.jpg",
    excerpt:
      "Celebrating our top performers who closed deals in Q1. See who made the list!",
    content: `This Is What Daring Looks Like!

  Featuring our Q1 Deal Closers.

  Coming soon...

  Every quarter, we recognize the realtors in our community who have demonstrated exceptional performance. These are the closers who are setting the pace for others to follow.

  Stay tuned to see who made the list and learn from their winning strategies.`,
  },
  // APRIL BLOGS

  {
    id: "09",
    slug: "real-estate-101-before-you-call-yourself-a-realtor",
    categoryId: "insights",
    category: "Real Estate Insight",
    title: "Real Estate 101: Before You Call Yourself a Realtor… Read This",
    author: "Oladokun Janet",
    date: "APRIL 2026",
    image: "/prospecting.png",
    excerpt:
      "Let’s be honest… Some of you want to sell property but if a client asks you one or two questions… you begin to stammer.",
    content: `Let’s be honest… Some of you want to sell property but if a client asks you one or two questions… you begin to stammer. Relax, this is a safe space. If you’ve done the Daring Tribe crash course, this is your “oh yes” moment. If you haven’t… just read quietly and pretend you have.

So what exactly is real estate? No big grammar. Real estate is simply: Land + anything standing on it. That’s it. House? Real estate. Shop? Real estate. But as a Daring Realtor, it’s deeper than that. This thing we’re selling? It's an opportunity. It’s money. It’s future soft life.

Now let’s break it down.

Everything you’ll ever sell falls into 4 categories:

Residential – Where people live (your clients that want “something calm and standard”).
Commercial – Where money is made (shops, offices… where business happens).
Industrial – Serious business zones (factories, warehouses… not your everyday client).
Land – The OG investment (the one people will say “I’ll buy later” until price doubles).

Let’s not lie… There’s a difference between: “I sell property” and “I know what I’m doing.”

When you understand this thing well:
• You stop sounding unsure
• Clients start taking you seriously
• You explain things without checking Google mid-conversation
• And most importantly… you CLOSE DEALS

This market is full of “realtors,” but not all of them actually understand what they’re selling. Don’t be that person.

Be the one that:
Knows.
Explains.
Confidently collects payment.

Stop just posting flyers. Stop copying captions. Know your product.

Because the moment you understand it well… you won’t need to convince clients. They’ll convince themselves.`,
  },

  {
    id: "10",
    slug: "prospecting-doesnt-have-to-suck",
    categoryId: "salesbook",
    category: "The daring sales book",
    title: "Prospecting Doesn’t Have to Suck: Here’s How",
    author: "Favour Abiodun",
    date: "APRIL 2026",
    image: "/deal-closers.png",
    excerpt:
      "You’ve probably heard this a million times if you are a realtor: “Prospecting is hard.”",
    content: `You’ve probably heard this a million times if you are a realtor: “Prospecting is hard.” “I don’t know what to say.” “Clients don’t reply anyway.” Sound familiar?

Let me tell you something… prospecting doesn’t have to suck. In fact, if done right, it can become the easiest part of your day—the part where clients actually come to you instead of you chasing them.

Let’s be honest, most people treat prospecting like punishment. You scroll endlessly through social media, shoot messages, hope someone responds… and nothing. Then frustration hits.

Prospecting fails when it’s inconsistent or aimless. Showing up once in a while won’t cut it. But show up daily, with a system, and you start to see magic happen.

Step 1: Grab Attention First

Before you can sell, you need to be seen. Stop being just another name in someone’s DM list or social media feed.
• Share tips your audience actually cares about  
• Drop mini “how-to” guides in short posts  
• Share success stories of clients (without bragging, just proof)  

The goal? Make them notice you, not just your listing.

Step 2: Show Value, Not Just Features

People don’t buy houses. They buy how the house will make their life better.

Instead of saying: “This apartment has 3 bedrooms and 2 bathrooms.”
Try: “Imagine waking up in your own 3-bedroom space with sunlight pouring in every morning… and knowing it’s officially yours.”

See the difference? You’re not just selling a building, you're selling a dream they can picture.

Step 3: Consistency is Everything

Prospecting isn’t a one-time thing. It’s like exercising—the results come with habit.
• Post consistently on social media  
• Follow up with potential clients daily/weekly  
• Keep your network updated on new opportunities  

Even if it feels like nothing is happening, trust me: the people you touch now will remember you later.

Step 4: Follow Up Like a Pro

Here’s the ugly truth: most deals are lost not because clients aren’t interested, but because realtors stop following up too soon.

Follow-ups don’t have to be awkward. A simple:
“Hey, just checking in to see if you had any questions about the property we discussed.”
…goes a long way.

Polite, consistent, and respectful = results.

Do this, and suddenly… deals aren’t a game of luck. They’re predictable, repeatable, and yours for the taking.`,
  },

  {
    id: "11",
    slug: "this-is-what-daring-looks-like-q1-deal-closers",
    categoryId: "daring",
    category: "What’s Daring?",
    title: "This Is What Daring Looks Like ft Q1 deal closers",
    author: "Balogun Mutmainnah, Christian Kuyet Martha, Samuel Deborah",
    date: "APRIL 2026",
    image: "/prospecting1.png",
    excerpt:
      "What does it truly mean to be daring in today’s real estate space?",
    content: `What does it truly mean to be daring in today’s real estate space?

Is it about taking risks, showing up daily, or pushing forward even when results aren’t immediate?

In Q1, a few standout realtors didn’t just set goals—they went after them with intention, resilience, and bold action. From hosting their first webinars to converting skeptical prospects into paying clients, these individuals embodied what it means to step out of comfort zones and win.

This feature highlights real stories from our Q1 deal closers—individuals who chose consistency over excuses, courage over fear, and action over doubt. Who knows? Your story might be next.

Straight from the desk of Balogun Mutmainnah, the Real Estate Queen and one of our top Q1 closers:

1. What was your biggest driving force to close deals in Q1?

I created a target to close 10 deals for Evergreen Farms Phase 1. Creating my own target is one of the reasons why I always showed up every day until I made my first sale.

2. What specific action helped you convert a prospect into a paying client (e.g., follow-ups, content, referrals, etc.)?

I created my own strategy, which is educating people. I like to educate people on things I know, and that is why I created my first webinar for undergraduates.

3. Can you briefly walk us through one deal you successfully closed?

It wasn't easy, but with the support of my coach and the community lead, Miss Opemipo (DRealtor) at the Daring Tribe group, I was able to organize my first webinar. She was my first speaker and one of the first people who welcomed and encouraged me in the group. She supported me a lot—teaching me how to prospect, how to reply to clients, and motivating me to keep showing up.

A well-deserved story from the top-selling triber in Q1: Christian Kuyet Martha

1. What was the most daring move you took that paid off?

The most daring move I took was securing my first plot of land even when my bank account was telling me not to. This became a strong point of sale for me.

2. What challenge did you face, and how did you overcome it?

One challenge I faced was clients hesitating to make payment despite showing interest. I overcame this by creating urgency—letting them know that the land was limited and could be sold out if they delayed payment.

3. What one piece of advice would you give realtors looking to close deals in Q2?

Focus on consistent follow-ups and educating clients. Many deals are not closed because realtors stop following up too early. Most clients need time, information, and trust before making payment.

Featuring Samuel Deborah, a Q1 deal closer:

1. What specific action helped you convert a prospect into a paying client?

Consistent follow-ups and helping clients see the value of the property played a major role. I stayed in touch with prospects, provided relevant property options, and answered their questions promptly, which helped build trust and confidence.

2. Can you briefly walk us through one deal you successfully closed?

I engaged a prospect who was initially undecided. I took time to understand their needs, and Baj Court turned out to be the best option. I showed them suitable options and maintained consistent communication.

I helped the client see the future value—that the property was close to a school and had strong potential. Although the client was concerned about the cost, I helped them focus on the long-term benefits, and after a few days, I closed the deal.

3. What was the most daring move you took that paid off?

The most daring move I took was reaching out persistently to a cold lead who initially showed little interest. Through consistent follow-ups and providing value, the lead eventually converted into a paying client.

4. What one piece of advice would you give realtors looking to close deals in Q2?

Stay consistent and don’t give up on follow-ups. Many deals are closed through persistence, proper communication, and building genuine relationships with clients.

As we step into Q2, let these stories challenge you to do more, be more, and push beyond your limits. Set your targets, refine your strategies, and most importantly, stay committed to the process.

Your next closed deal could be one decision, one follow-up, or one bold move away.

So the question is… what daring step will you take next?`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_DATA.find((post) => post.slug === slug);
}

export function getRelatedPosts(
  currentSlug: string,
  categoryId: string,
  limit: number = 3,
): BlogPost[] {
  return BLOG_DATA.filter(
    (post) => post.slug !== currentSlug && post.categoryId === categoryId,
  ).slice(0, limit);
}

export function getCategoryById(id: string) {
  return CATEGORIES.find((cat) => cat.id === id);
}
