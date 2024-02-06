# Deno Merch

The Deno shop! Built with [Deno](https://deno.land/) and
[Fresh](https://fresh.deno.dev/), and deployed to the edge with
[Deno Deploy](https://deno.com/deploy).

Using SSR, islands architecture, and being deployed close to users, this shop
has a perfect Lighthouse score of 100.
[_Learn how you can build an e-commerce site with a perfect Lighthouse score._](https://deno.com/blog/ecommerce-with-perfect-lighthouse-score)

## Screen Shot

![Screen Shot](./static/screen_shot.png)

## Develop locally

- Clone the repository
- Set up Shopify credentials in the `.env`, follows `.env.example`.
- Start the project in local mode:
  ```bash
  deno task start
  ```

## Deploy to global

Sign in to [dash.deno.com](https://dash.deno.com), create a new project, and
then link to your clone version of the repository.

## Perfect Lighthouse score

![Perfect lighthouse score](https://deno.com/ecommerce-with-perfect-lighthouse-score/perfect-score.png)

Today’s consumers are more demanding than ever, especially when it comes to
shopping online. These experiences must feel intuitive and snappy. Even a
[100-millisecond delay in load time can hurt conversion rates by 7%](https://s3.amazonaws.com/sofist-marketing/State+of+Online+Retail+Performance+Spring+2017+-+Akamai+and+SOASTA+2017.pdf).

Our [merch store](https://merch.deno.com), built with
[Fresh](https://fresh.deno.dev) is server-side rendered (SSR) with some
[islands of interactivity](https://fresh.deno.dev/docs/concepts/islands) and
deployed close to users on the edge. Sending only what the client needs keeps
the site lean and fast, earning it a perfect
[Lighthouse score](https://pagespeed.web.dev/).

Check out
[our tutorial](https://deno.com/blog/ecommerce-with-perfect-lighthouse-score)
that teaches you how to build an e-commerce site with a perfect Lighthouse
score.
