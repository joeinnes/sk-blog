---
title: Avenir
date: 2022-10-02T13:30:00.000Z
---

<script>
	import FontSample from '$lib/components/FontSample.svelte';
</script>

Recently I've been really enjoying using Avenir for stuff. I love its simplicity. The geometric tittle above a rectangular stem of the 'i', the soft, friendly, regular curves of the a's and the e's. It's just a very nice font.

<div class="full-bleed not-prose">
  <FontSample fontName="Avenir" pinHue={201} />
</div>

Unfortunately, if you're not on a Mac, you'll already see what the problem is. It seems as though it's only available on macOS, and Windows doesn't have it installed by default. There are a few very pretty fonts which could be used in its place, but they're all Mac only (Avant Garde, Futura...). But the only similar font with wider adoption seems to be Gill Sans.

<div class="full-bleed not-prose">
  <FontSample fontName="Gill Sans" wordTest="COLLEGIUM" />
</div>

But Gill Sans is not as regular - the shoulders and collars are not perfectly rounded, the font feels a little... chubbier? And according to [CSS Font Stack](https://www.cssfontstack.com/Gill-Sans), it's still only compatible with less than 60% of Windows computers.

<div class="full-bleed not-prose">
  <FontSample fontName="Satoshi" fontSrc="https://api.fontshare.com/v2/css?f[]=satoshi@1&display=swap" wordTest="Wigglesworth" />
</div>

[Satoshi](https://www.fontshare.com/fonts/satoshi) by the Indian Type Foundry is pretty cool, as are quite a few of their geometric sans fonts, but not sure how I feel about having a web font rather than using the system stack (or whatever my readers/visitors might have available).

<div class="full-bleed not-prose">
  <FontSample fontName="Outfit" fontSrc="https://api.fontshare.com/v2/css?f[]=outfit@1&display=swap" wordTest="Üllői űrhájó" />
</div>

[Outfit](https://www.fontshare.com/fonts/outfit) is also very beautiful. The problem with Outfit is that it doesn't seem to have the Hungarian accented characters that I might occasionally want to write (like the 'ő' in 'Üllői út', or the 'ű' in 'űrhájó'). I did write an package that tries to help with that (https://github.com/joeinnes/double-prime-vowels), but it's a long way from perfect.

<div class="full-bleed not-prose">
  <FontSample fontName="Century Gothic" fontSrc="http://fonts.cdnfonts.com/css/century-gothic" wordTest="BALLOON" />
</div>

I think I'm going to have to stick with Century Gothic as my back-up. It has better support (almost 90% of Windows computers according to [CSS Font Stack](https://www.cssfontstack.com/)). Ironically, Century Gothic is only available on Windows, so if you're on a mac, the panel above will be a default serif font.
