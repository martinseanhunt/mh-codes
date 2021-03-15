---
templateKey: project
title: Headless Shopify, NextJS and Apollo
order: 1
excerpt: "This was a time boxed project completed over a long weekend to act as
  a proof of concept for a statically generated headless Shopify store. This was
  an incredibly fun project. The challenge was to come up with a solution that
  makes the most of all that static generation has to offer whilst retaining the
  ability for product data and availability to remain up to date for the user
  even during potentially long rebuild times. A high level overview of the
  strategy I adopted was to use webhooks to trigger building / rebuilding pages
  when products are updated in shopify, then use incremental static regeneration
  so that whenever a customer visits a given page it triggers a near
  instantaneous rebuild of that single page which is then served to the next
  user who tries to access it. Finally, I use Apollo to silently query the
  shopify graphql API and update data in real time as the user browses the
  application as well as to fetch dynamic data from the server like a users
  saved cart session. This ensures staticially generated, but never stale data
  for a dynamic store or web application! "
tags:
  - NextJS
  - Shopify
  - SSG
  - Apollo
  - Headless
logo: next-js.svg
github: https://github.com/martinseanhunt/next-shopify
linkToDetails: false
---
This was a time boxed project completed over a long weekend to act as a proof of concept for a statically generated headless Shopify store. This was an incredibly fun project. The challenge was to come up with a solution that makes the most of all that static generation has to offer whilst retaining the ability for product data and availability to remain up to date for the user even during potentially long rebuild times. A high level overview of the strategy I adopted was to use webhooks to trigger building / rebuilding pages when products are updated in shopify, then use incremental static regeneration so that whenever a customer visits a given page it triggers a near instantaneous rebuild of that single page which is then served to the next user who tries to access it. Finally, I use Apollo to silently query the shopify graphql API and update data in real time as the user browses the application as well as to fetch dynamic data from the server like a users saved cart session. This ensures staticially generated, but never stale data for a dynamic store or web application!