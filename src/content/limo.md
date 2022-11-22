---
title: A Curious Loophole
date: 2022-11-21T19:19:00.000Z
featured_image: /media/uploads/MOL_Limo.png
page_bg: rgb(139, 204, 115)
excerpt: An exploration of optimising car rentals to travel as cheaply as possible.
---

There's a curious optimisation posibility when you rent out a MOL Limo for a longer period compared to a normal rental car.

I will be comparing [BérAutóKirály](https://berautokiraly.hu/szemelyauto-berles/volkswagen-up)'s prices against [MOL Limo](https://www.mollimo.hu/hu/araink)'s monthly plan. It's worth noting that there are no circumstances where it is better _not_ to pay the 1490 HUF monthly fee if you are renting a car for more than 5 hours (the point at which the _napi díj_ takes effect). I've rented from BAK before, and they're well-rated and trustworthy. Deposit will not be considered as part of the rental cost, as it should be returned. The cost per litre for petrol will be assumed to be 680 HUF, [the average from 01-Aug-2022 to 07-Nov-2022](https://www.globalpetrolprices.com/Hungary/Budapest/gasoline_prices/). A VW Up! uses around [4.4l/100km with combined usage](https://motoreu.com/volkswagen-up-1.0-mpg-fuel-consumption-technical-specifications-24351).

## Limitations

- With a traditional rental, you can pick up and drop off on business days (Monday-Friday) only
- With a MOL Limo, the days are considered rolling 24 hour periods initiating from the moment you start the rental.
- You can rent a Limo for a maximum of 72 hours
- Each 'day' brings 100 km of travel for free with a Limo (300km/day with BÁK, but this does not include fuel)
- The cheapest Limo is a Dacia Spring, but in order to make a comparison, the slightly more expensive VW Up! will be considered. The photo at the top of this post is an eUp! which is basically the same except with an electric motor. The prices have also gone up since that photo was published—it's now 76 HUF/min
- No motorway vignettes are considered (or provided by either rental organisation)

## A Traditional Rental

As of today, a [Volkswagen Up!](https://berautokiraly.hu/szemelyauto-berles/volkswagen-up) is available for 8 500HUF/day (although the homepage mentions 6 000HUF, this applies if you rent for a full month at a time).

## Optimising for Daily Distance

After the initial 100km, there is a per kilometer charge of 109 HUF. This is significantly more expensive than BAK, where the overage from 300km is 40HUF/km, but it is worth considering that fuel costs are included in the MOL rental, while they are not with BAK.

Assuming 4.4l/100km is equal to 0.044l per km. With 680HUF per litre, the per kilometre fuel cost is 29.92HUF. That means the Limo is 80HUF/km more expensive over longer distances. However, over short distances, the Limo is optimal. Over longer distances, the cost of the Limo very quickly exceeds the cost of BAK rental beyond 137km/day. At 224km, it is already cheaper to rent the car for two days, and leave it unused for the full 24 hours (and thereby qualify for a second '100km free'). Assuming a three-day/72-hour rental, the crossover point is 414km. Until 414km, it is cheaper to rent a Limo for 72 hours based purely on distance.

Assuming a minimal rental of 3 days, BAK is _cheaper_ in all circumstances, regardless of distance driven.

## Optimising for Minimum Time Rented

You can, however, make big savings renting a Limo if you can reduce the amount of time the car is rented for. Assuming you rent the car for 48h and 1 minute (to start the free 100km for the third day), it is cheaper to rent a Limo up to 393km, or between 432 and 489km. Have a play with the calculator below to help you decide.

<div class="flex flex-col gap-2">
Distance: <input type="number" bind:value={distance} class="border-2 rounded p-2 border-black" />
Days: <input type="number" bind:value={lengthOfRentalDays} class="border-2 rounded p-2 border-black"/>
Hours: <input type="number" bind:value={lengthOfRentalHours} max="23" class="border-2 rounded p-2 border-black"/>
Minutes: <input type="number" bind:value={lengthOfRentalMinutes} max="59" class="border-2 rounded p-2 border-black"/>
</div>
{#key rentalLengthInMins}

<table>
<thead>
<tr>
<th>
</th>
<th>
MOL Limo
</th>
<th>
BérAutóKirály
</th>
</tr>
<tbody>
<tr>
<td>
Rental
</td>
<td>
{LimoRentalCost()} HUF
</td>
<td>
{BAKRentalCost()} HUF
</td>
</tr>
<tr>
<td>
Distance
</td>
<td>
{LimoPriceForDistance(distance)} HUF
</td>
<td>
{BAKPriceForDistance(distance)} HUF
</td>
</tr>
</tbody>
<tfoot>
<tr>
<th>
Total
</th>
<th>
{LimoPriceForDistance(distance) + LimoRentalCost()} HUF
</th>
<th>
{BAKPriceForDistance(distance) + BAKRentalCost()} HUF
</th>
</tr>
</tfoot>
</table>
<p>For your journey, {(LimoPriceForDistance(distance) + LimoRentalCost()) > (BAKPriceForDistance(distance) + BAKRentalCost()) ? 'a normal rental' : 'a Limo'} is cheaper.
{/key}

Whereever you're going though, I hope you have a lovely time.

<script>
  let lengthOfRentalDays = 1 // 3 full days;
  let lengthOfRentalHours = 12;
  let lengthOfRentalMinutes = 0;
  let rentalLengthInMins = 3*24*60;
  let distance = 150;

  const minimumBAK = 25500;
  const BAKPriceForDistance = (kms) => {
    const fuelOnly = 29.92 * kms;
    const excessMileage = Math.max(kms - (lengthOfRentalDays * 300), 0) * 40;
    return fuelOnly + excessMileage;
  }

  const LimoPriceForDistance = (kms) => {
    let freeKms = lengthOfRentalDays * 100;
    if (lengthOfRentalHours > 0 || lengthOfRentalMinutes > 0) {
      freeKms = freeKms + 100
    }
    const excessMileage = Math.max(kms - freeKms, 0) * 109;
    return excessMileage;
  }

  const BAKRentalCost = () => Math.max(25500, lengthOfRentalDays * 8500);

  const LimoRentalCost = () => {
    if (lengthOfRentalDays > 3 || (lengthOfRentalDays == 3 && (lengthOfRentalHours > 0 || lengthOfRentalMinutes > 0) )) {
      return 'TOO MUCH TIME'
    }
    const startingFees = 1490+150;
    const dailyFees = lengthOfRentalDays * 13500;
    let hourlyFees = 13500;
    switch (lengthOfRentalHours) {
      case 0:
        hourlyFees = 0;
        break;
      case 1:
        hourlyFees = 4560;
        break;
      case 2:
        hourlyFees = 6880;
        break;
      case 3:
        hourlyFees = 9120;
        break;
      case 4:
        hourlyFees = 11440;
        break;
    }
    const minuteFees = lengthOfRentalMinutes * 76;
    return startingFees + dailyFees + hourlyFees;
  }

  $: {
    rentalLengthInMins = lengthOfRentalMinutes + lengthOfRentalHours * 60 + lengthOfRentalDays * 24 * 60;
  }
</script>
