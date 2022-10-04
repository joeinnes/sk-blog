---
title: T-Mobile Austria's Customer Service Car Crash
date: 2018-04-07T12:15:20.000Z
date_updated: 2019-11-10T12:55:10.000Z
---

It all started on April 4th when a well—meaning tweet was sent to T-Mobile Austria:

> Does T-Mobile Austria in fact store customers’ passwords in clear text [@tmobileat](https://twitter.com/tmobileat?ref_src=twsrc%5Etfw)? [@PWTooStrong](https://twitter.com/PWTooStrong?ref_src=twsrc%5Etfw)[@Telekom_hilft](https://twitter.com/Telekom_hilft?ref_src=twsrc%5Etfw)[https://t.co/ydFdVRWgE4](https://t.co/ydFdVRWgE4) > &mdash; Claudia Pellegrino (@c_pellegrino) [April 4, 2018](https://twitter.com/c_pellegrino/status/981409466242486272?ref_src=twsrc%5Etfw)

T-Mobile sent the following alarming response:

> Hello Claudia! The customer service agents see the first four characters of your password. We store the whole password, because you need it for the login for [https://t.co/vJapgJ50qc](https://t.co/vJapgJ50qc) ^andrea
> &mdash; T-Mobile Austria (@tmobileat) [April 4, 2018](https://twitter.com/tmobileat/status/981418339653300224?ref_src=twsrc%5Etfw)

To understand why this is alarming, I need to take a little trip down the hallways of cybersecurity.

## How companies store passwords

It's important to understand that when you log into a secure website, the company that you're sending your password to (should) never actually store that password. That sounds counter-intuitive on the first glance, after all, how can you validate the password that the user sent if you don't store it?

Let's start with the most simple version, we simply have a secret code to 'decode' your password, like a [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher), where I add one to every letter. Your password is 'hunter2', so when I save it in my database, I save `ivoufs3`. Next time you try to log in, you'll send me your password, and I'll add one to every letter, then compare it to what's in my database. If you type `hunter2`, then I'll always end up with `ivoufs3`, and I'll know you typed in the password. However, a hacker who breaks into the database only knows the encoded version of the password, not your original password.

This allows us to validate your password without ever actually saving your password. There are some really clever encryption methods which are _much_ stronger than a Caesar cipher, but the principle is still the same.

A very clever encryption method might even be one-way. I won't go into the details of these here, but basically, what this means is that if you have the output, you can't 'reverse' it easily to get the input. A very simple example of a one-way encryption method would be to do something like:

1. Convert using the Caesar cipher (`hunter2` → `ivoufs3`)
2. Create a sum using the differences between letters (so, i → v = 13, v → o = -7, giving '13 - 7 + 6 - 15 + 13 + 10', assuming the numbers are listed after the letters)
3. Complete the sum, giving `20`.
4. Store this number in your database.

Even if a hacker gets the number 20 somehow, they will never be able to tell that your original password was `hunter2`.

This is a very simple example for illustration, and has serious problems because it produces a lot of 'collisions' (if I typed in `au`, as a password, then it would also give me `20`, so I'd be able to log in using this 'wrong' password). There are some very well known functions which don't have this problem, and you can spend all day giving them different passwords, and they'll produce a different so-called 'hash' each time, and they're completely one-way.

But hackers are a clever bunch, and they soon realised that if these functions are reliable and quick in converting inputs to outputs, they can just try to create lists of _every_ possible password. That way, they don't need to 'reverse' the maths, they just need to look it up. For example, one of the most popular algorithms is known as SHA-256, which gives us `f52fbd32b2b3b86ff88ef6c490628285f482af15ddcb29541f94bcf526a3f6c7` for `hunter2`. Unfortunately, this is such a commonly used password, that `F52FBD32B2B3B86FF88EF6C490628285F482AF15DDCB29541F94BCF526A3F6C7` is already listed in what are called 'Rainbow tables'—huge lists of passwords and their hashes, making it very simple for a hacker to look them up.

Determined hackers don't even need rainbow tables any more. For retail computer prices, anyone can get a computer built out that can run through [**every single possible** 8 character password in less than 4 days](https://blog.ircmaxell.com/2011/08/rainbow-table-is-dead.html).

To make it difficult to crack a large number of passwords at once, security experts recommend using a 'salt'. This is a random string added on to each password before hashing it.

For example, `hunter2` + `1EF9888BCA` gives us `895B71C0196C0246DA4E39048866C630443C29A3F54404513F2BD3FDAF762A61`.

This second part (`1EF9888BCA`) is stored in the database next to my password's hash. Because it's different for every user, it makes it impractical to use a rainbow table to get a massive list of passwords all at once. It doesn't protect _single users_, so if a hacker gets access to this database, they can use the method described in the link above to get a single user's password in less than four days. It does mean though that it would take more than a year to get 100 users' passwords, and so on.

So, to protect individual users, there's often a secret 'pepper' used, which is stored somewhere away from the database, in a secure location. Then, when you 'hash' the password, you use the secret pepper as well:

`hunter2` + `1EF9888BCA` + `CheeseIsGreat` = `C3D0DB7D178552362DECD0832615E1B5955FF65785F1D0A3EBDEDB96FE7C358A`.

Even if the database is compromised, individual users passwords are still protected by the 'pepper', so the hacker would also need to find where this is stored, and compromise this too.

To summarise:

UsernamePasswordSaltPepperHash` joe``hunter2``F52FBD32B2B3B86FF88EF6C490628285F482AF15DDCB29541F94BCF526A3F6C7``joe``hunter2``1EF9888BCA``895B71C0196C0246DA4E39048866C630443C29A3F54404513F2BD3FDAF762A61``joe``hunter2``1EF9888BCA``CheeseIsGreat``C3D0DB7D178552362DECD0832615E1B5955FF65785F1D0A3EBDEDB96FE7C358A``john``hunter2``2BED984510``CheeseIsGreat``635B34FA70CC99B9D67C4C662622AB53D8CFEB08224AA74C9C5CE2AD10EFA705 `

## So what did T-Mobile get wrong?

Because these 'hashes' are not reversible, and it's unlikely the T-Mobile customer service representatives are cracking the passwords every time to get the first four characters, we know that one of three things is happening (from least likely to most likely):

1. T-Mobile are not _salting_ their passwords, and are maintaining an internal rainbow table (maybe they are using a 'pepper')
2. T-Mobile are not hashing their passwords at all
3. T-Mobile are storing the first four characters of a user's password separately in plain text.

Every single one of these is a bad idea, security speaking.

'But Joe', you say, 'I thought this article was about customer service?!'. OK, OK, here we go:

## Mistake № 1: Handwaving

Once Andrea's response was sent out, the original tweeter replied (politely), asking how it could be fixed.

> Thanks for your reply Andrea! Storing cleartext passwords in a database is a naughty thing to do. [https://t.co/pbTxmSJrOP](https://t.co/pbTxmSJrOP) What can we do to get your devs to fix that?
> &mdash; Claudia Pellegrino (@c_pellegrino) [April 4, 2018](https://twitter.com/c_pellegrino/status/981596868709961728?ref_src=twsrc%5Etfw)

What followed from T-Mobile was an absolute disaster of a tweet from a different social media manager:

> Hi [@c_pellegrino](https://twitter.com/c_pellegrino?ref_src=twsrc%5Etfw), I really do not get why this is a problem. You have so many passwords for evey app, for every mail-account and so on. We secure all data very carefully, so there is not a thing to fear. ^Käthe
> &mdash; T-Mobile Austria (@tmobileat) [April 5, 2018](https://twitter.com/tmobileat/status/981785213549383680?ref_src=twsrc%5Etfw)

### Lesson: don't patronise your customers, or dismiss their concerns.

## Mistake № 2: Doubling down

By this point, the story was starting to pick up a bit of momentum, and another tweeter weighed in asking:

> Well, what if your infrastructure gets breached and everyone’s password is published in plaintext to the whole wide world?
> &mdash; Eric™ (@Korni22) [April 6, 2018](https://twitter.com/Korni22/status/982187278033301507?ref_src=twsrc%5Etfw)

At this point, Käthe should probably have checked with her boss before replying, but didn't. Her response was a hubris-filled surprise:

> [@Korni22](https://twitter.com/Korni22?ref_src=twsrc%5Etfw) What if this doesn&#39;t happen because our security is amazingly good? ^Käthe
> &mdash; T-Mobile Austria (@tmobileat) [April 6, 2018](https://twitter.com/tmobileat/status/982187919061303296?ref_src=twsrc%5Etfw)

Now, I'm sure T-Mobile take security seriously, but this is Donald Trump-level bluster.

### Lesson: rather than making a broad sweeping statement on a topic you clearly don't understand, check with an expert.

## Mistake № 3: Making it personal

The following few tweets are some of the most bizarre tweets I've ever seen from a corporate account:

> [@Korni22](https://twitter.com/Korni22?ref_src=twsrc%5Etfw) Excuse me? Do you have any idea how telecommunication companies work? Do you know anything about our systems? But I&#39;m glad you have the time to share your view with us. ^Käthe
> &mdash; T-Mobile Austria (@tmobileat) [April 6, 2018](https://twitter.com/tmobileat/status/982190220798967809?ref_src=twsrc%5Etfw)

I'm surprised that no-one had relieved Käthe by this point, but she released a passive-aggressive tirade against @Korni22 until her shift ended.

### Lesson: when you're in a hole, stop digging, and certainly don't start insulting people

## Mistake № 4: Not owning it

Eventually, it seems Käthe disappeared from the picture, and T-Mobile's 'company spokesperson' Helmut weighed in with what is presumably an official opinion and statement which has been the subject of hasty conference calls.

> Customer service agents see only parts of customers‘ passwords which are safely stored in encrypted databases via industry standard encryption algorithm. We are also using one-time-PINs for customer authentication and are evaluating voice biometrics. ^Helmut [@ojour](https://twitter.com/ojour?ref_src=twsrc%5Etfw) > &mdash; T-Mobile Austria (@tmobileat) [April 6, 2018](https://twitter.com/tmobileat/status/982394129249460226?ref_src=twsrc%5Etfw)

No apology, no acknowledgement of concerns, and no explanation that passes any muster. I'm not a PR wizard, but at this point, surely a better approach would have been:

"We understand customers are concerned about security processes—customers' passwords are stored in encrypted databases, and we use one-time-PINs. Our responses yesterday were overconfident this was adequate. We're reviewing urgently and we'll let everyone know the outcome."

### Lesson: own your mistakes, don't be afraid to apologise when needed

All in all, a bad day at the office for T-Mobile Austria. Customer service is rarely easy, but it's also pretty hard to get it this wrong.

<style>
.full-width {
width: 100vw;
position: relative;
left: 50%;
right: 50%;
margin-left: -50vw;
margin-right: -50vw;
}

table td {
padding: 1em;
}
table th {
border-bottom: 1px solid #333;
font-weight: 700;
}
table td {
border: 1px solid #ddd;
}
</style>
