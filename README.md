# Micro Frontend Proof of Concept

Demo: https://d1q8kh006cynrk.cloudfront.net

---

### Webpack Module Federation for Micro Frontend

This repository demonstrates my learning of `Webpack Module Federation` when implementing Micro Frontends Architecture. This approach is using `Run-time Microfrontend` (more on my thoughts on `Build-time Microfrontend` on closing remarks below).

This is just a proof of concept application.

#### Monorepo
This MFE uses monorepo approach.
- `packages/container` `(React)` is the container/shell/host app that will contain all the micro frontends.
- `packages/marketing` `(React)` is the micro frontend that handles opening homepage & pricing page.
- `packages/auth` `(React)` is the micro frontend that handles opening sign in and sign up page.
- `packages/dashboard` `(Vue)` is the micro frontend that handles opening the dashboard, only accessible if user is signed in.

#### Decomposition
This website uses microfrontend architecture, where it decomposes a monolith into 3 different microfrontends (with 1 container/shell/host app):
- `Team A (Container)`: manages the loading of each MFEs
- `Team B (Marketing)`: manages the home page & pricing page.
- `Team C (Auth)`: manages the signin & signup page.
- `Team D (Dashboard)`: manages the dashboard page.

#### Communications
This microfrontend architecture manages communication by using `callbacks` that is made as generic as possible to `ensure loose coupling between each MFE's technology stack`. 

Mounting:
- Each MFE provide a `mount` function that takes an element as input for the container to put the MFE app into.

State:
- This app demonstrate basic authentication. State will be centralized in container (where it currently holds only `isSignedIn`). We `pass callbacks/events handler` into the `mount` function as 2nd argument.

#### CI/CD Pipeline
This POC APP uses GitHub action to manages its CI/CD pipelines. You can see `.github/workflows` where there are 4 different `.yml` files, each taking care of each MFE deployment into an `AWS S3` bucket with `AWS Cloudfront` middleware acting as CDN Cache.

---

### Closing Remarks

#### Decomposition & Communication
When decomposing MFE, my general rule is to minimize communication between each MFE as low as possible (or if possible, zero), let it be handled by backend APIs. 

If your MFE becomes talkative with other MFE, then it is best to reconsider your decomposition approach, you should have merge those 2 MFE into one.

But when talking of communication between container and each MFE, it is usually fine to have communication. But still, try to keep it as low as possible. (best use cases: navigation, authentication).

#### Build-time vs Run-time?
Run-time MFE architecture provides the best solution when it comes to isolation. It can be deployed independently, scaled independently.

While Build-time MFE architecture requires you to deploy it in a sequence. So each MFE projects become tightly coupled.

`Both approach are fine and can still provide a MFE architecture. It all comes down to your use cases/project requirements/team requirements. If I had to pick one, I would choose Run-time approach`

#### single-spa.js vs Webpack Module Federation?

`Disclaimer: This is my opinion.`

- `single-spa.js` is more `opinionated`, has more additional features (because it directly solves the problem of multi framework MFE). Haven't tried it myself, so this conclusion might be premature, will try it in near future.

- `Webpack Module Federation` is `unopinionated`. It starts with the problem of sharing modules, but ultimately act as a tool at core to share module. But can be solved in MFE as well (build time, run time). This is unopinionated, and I think is the best solution right now, because most project is already built with webpack that is already integrated with module federation plugin.

`Ultimately, it comes back to your use cases/project requirements. But if I had to pick one as a fresh start, I would use Webpack Module Federation`

#### Notes

This POC app is created alongside following an Udemy course, thanks to Stephen Grider. (https://www.udemy.com/course/microfrontend-course/)
