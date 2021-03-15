---
templateKey: blog-post
title: How to invalidate cached data in Apollo and handle updating paginated queries
tags:
  - Guide
  - graphQl
  - Apollo
  - React
  - Node
  - Prisma
externalUrl: https://medium.com/@martinseanhunt/how-to-invalidate-cached-data-in-apollo-and-handle-updating-paginated-queries-379e4b9e4698
date: 2021-10-23T19:19:12.899Z
---
After spending some time diving in to understanding and implementing a graphQL based stack *I’m blown away by how easy it is to rapidly develop complex applications.* I’m particularly impressed by how graphQL queries empower front end developers to access the data they need across multiple related data types without needing a *specific* endpoint for each query.

*That said, the stack is not without it’s pain points. On the front end, one of those challenges is around invalidating data stored in the Apollo cache when that data has been changed server side. this can be particularly troublesome when working with paginated queries. This guide aims to help you better udnerstand the problem and explore a few workarouds!*