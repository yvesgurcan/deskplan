# deskplan

📎 Managing your office supplies has never been easier!

## Stack

-   Client written with React and Apollo Client.
-   Service written with Node and Apollo Server.
-   Data store managed with MongoDB and Mongoose.

## Alpha version

An MVP (minimum viable product) with some nice-to-have features.

### Product features

-   Manage your office assets: Create, view, update, and delete items.
-   Begin with a set of starter items to help you keep track of inventory from the get go.
-   Search your items by name.
-   Sort your items by date of creation, date of last update, name, or quantity to find them more easily.
-   Add links to your items to view the properties of your assets easily.
-   Duplicate existing items to use as a base to create a new ones.
-   The user interface adapts to the size of your screen so that you can work on small devices or large screens.
-   Responsive design: Access your inventory even if you are offline or experiencing connectivity issues.
-   Update your inventory in no more than two clicks.
-   Something went wrong? A message informs you, if possible, about the nature of the error.

### Technical features

-   [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/) to support JavaScript EcmaScript 2015 to EcmaScript 2020 with features such as [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining), [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), and the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).
-   [React 16](https://reactjs.org/) to take advantage of its [component](https://medium.com/teamsubchannel/react-component-patterns-e7fb75be7bb0) pattern as well as [hooks](https://reactjs.org/docs/hooks-reference.html) such as `useState`, `useEffect`, `useMemo`, and custom hooks with `useRef`.
-   [Apollo Client](https://www.apollographql.com/docs/react/) and [Apollo Server](https://www.apollographql.com/docs/apollo-server/) to introduce a strongly typed and scalable interface between the client and the server, also using [Apollo hooks](https://www.apollographql.com/docs/react/api/react-hooks/) such as `useQuery` and `useMutation`.
-   Client-side [persistent cache for Apollo](https://github.com/apollographql/apollo-cache-persist).
-   [Service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) with the [Webpack plugin for Google Workbox](https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack) to enable offline access to the application.
-   [Styled Components](https://styled-components.com/) to take advantage of the component pattern and keep styles scoped.
-   [Mongoose](https://mongoosejs.com/) to create data models and simplify data validation with [MongoDB](https://www.mongodb.com/).

## Next: Version 1

Our goal is to provide a solution that we like to call the "[JIRA](https://marketplace.atlassian.com/apps/1211849/assets-and-inventory-plugin-for-jira?hosting=server&tab=overview) of inventory management".

### Next: Product features

-   Support multiple organizations and users behind a paywall.
-   Choose among various starter item templates tailored to best fit the needs of your office.
-   Update and delete items in batch to work with your assets more quickly. Select multiple items, update their quantity or delete them all at once, like you would do it with your emails in Gmail.
-   Keep track of the status of your items. Possible values could be: "Ordered", "Received", "Lost", "Broken".
-   Keep track of who has been assigned which assets.
-   Keep track of where items are located.
-   Add your own properties to the items within the inventory.
-   Choose between a dark and a light theme.
-   Provide message feedback to the user when items are being created, updated, or deleted, and when the operation was a success.

### Next: Technical features

-   Creates Webpack builds optimized for production.
-   Support multiple environments: `dev`, `qa`, and `prod` thanks to a config file and/or environment variables.
-   User authentication with [Passport.js](http://www.passportjs.org/) as middleware.
-   Settings and preferences page.
-   Server-side caching strategy with [Node-Cache](https://www.npmjs.com/package/node-cache) or [Redis](https://redis.io/).
-   Use the [Apollo PubSub feature](https://www.apollographql.com/docs/apollo-server/data/subscriptions/) to push changes to the client when the database is updated by an external source.
-   CI/CD with [Jenkins](https://jenkins.io/) or [GitHub Actions](https://github.com/features/actions) to run tests, create build, and deploy automatically.
-   [Tighter validation on item URLs](https://www.npmjs.com/package/mongoose-type-url).
-   Unit tests, integration tests, and end-to-end tests with tools such as [Jest](https://jestjs.io/), [React Testing Library](https://github.com/testing-library/react-testing-library) and [Apollo's `createTestClient`](https://www.apollographql.com/docs/apollo-server/testing/testing/).
-   [Theming thanks to Styled Components](https://styled-components.com/docs/advanced#theming).
-   PWA (Progressive Web Application) to allow users to have a native-like experience on mobile devices thanks to a [web app manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest).

-   Item version history: Logging of the changes brought to each item [a la Google Drive](https://support.google.com/drive/answer/2409045?co=GENIE.Platform%3DDesktop&hl=en).

## Development

You need `node`, `npm`, and `mongod` (see [instructions](https://docs.mongodb.com/manual/administration/install-community/)) to be available globally on your machine. All other dependencies are installed at the project level.

See instructions for [client](./client) and [service](./service).

## Assignment (in French)

### Le projet

Vous devez créer une interface permettant de faire l'inventaire d'un bureau.
Faire l’inventaire d’un bureau signifie juste de compter ce qui est présent dans le bureau.
Le niveau de précision d’un inventaire est illimité, si un agent le décide il peut compter le nombre de fourchettes.
Dans le but de garder l’exercice simple nous partirons du principe que l’application est faite pour gérer un seul actif.

### Features à implementer

-   Ajout d’un élément
-   Suppression d’un élément
-   Le reste est libre

### Évaluation

Le sujet étant très simple, et la liste de features réduite, il est attendu du candidat d’implémenter les features de bases, puis de laisser libre cours à son imagination pour réfléchir à d’autres features et les implémenter. Les “bonus” attendu sont des features permettant de rendre le projet plus pratique à utiliser et plus efficace.

Le but de l’exercice est de juger le niveau technique du candidat, mais également de juger sa capacité à réfléchir aux différents cas d’usages d’un produit, et de se mettre à la place de l’utilisateur final.

Il n’est pas question de rendre un projet complet prêt à envoyer enprod, ça reste un exercice d’entretien, donc les idées les plus complexes pourront tout simplement être présentées à l’oral pendant la review du projet.

### Informations

Temps de travail : Ce qui vous semble raisonnable.

Exemples d’objets :

-   Imprimante
-   Café
-   Fontaine à eau
-   Bureau
-   Chaises
-   Verre d'eau
-   Télévision
-   Ventilateur

### Rendu

Envoyer une archive du projet, ou un lien Github/Gitlab/Bitbucket, avec les
instructions d’utilisation.
