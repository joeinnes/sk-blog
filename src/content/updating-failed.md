---
title: Updating failed. Could not update in the database
date: 2022-10-25T20:40:00.000Z
excerpt: How to fix this annoying Wordpress error which stops you from updating posts on your site.
page_bg: rgba(172,159,145,1)
featured_image: /media/uploads/etienne-girardet-OA0qcP6GOw0-unsplash.jpg
---

You're probably looking at this post because you've seen the error message `Updating failed. Could not update <field> in the database.` on a Wordpress site.

I came across this recently while doing some work for a client. There are several ways to fix it. The first is to manually recreate each page from scratch. I started doing this, thinking it was something to do with the Gutenberg block editor. But I got frustrated, I didn't want to go through 50 odd pages and make this correction manually.

I decided to look at the database itself to see if I could work out what the problem was. It turned out that the post meta table contained duplicate entries—where a single post had the same `meta_key` value.

I found [this site (Use Wordpress)](https://usewordpress.com/snippets/how-to-find-duplicate-post-meta-in-wordpress/) which helped me drill down into the data, and identify problem posts. Reproducing below in case it ever goes offline.

If you think you might have this issue, run the following SQL query:

```sql
SELECT T1.post_id, T1.meta_key,  T1.meta_value, T1.meta_id, T2.post_id, T2.meta_key, T2.meta_value, T2.meta_id
FROM wp_postmeta T1, wp_postmeta T2
WHERE T1.post_id = T2.post_id
AND T1.meta_value = T2.meta_value
AND T1.meta_key = T2.meta_key
AND T1.meta_id > T2.meta_id
```

If you have results, then you should _back up your database_, and then run the following:

```sql
DELETE T1 FROM wp_postmeta T1
INNER JOIN wp_postmeta T2
WHERE T1.post_id = T2.post_id
AND T1.meta_value = T2.meta_value
AND T1.meta_key = T2.meta_key
AND T1.meta_id > T2.meta_id
```

With a bit of luck, your problem will be solved.
