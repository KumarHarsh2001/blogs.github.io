const techBlogs = Object.freeze([
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Database',
    level: 'Intermediate to Advanced',
    effort: '6-8 hrs',
    summary:
      'Design relational schemas, reason about locking, and tune high throughput workloads with real query plans.',
    basics: [
      'Review ACID guarantees, isolation levels, and the storage engine trade-offs between InnoDB and MyISAM.',
      'Master SELECT, JOIN, window functions, and aggregations to answer analytics questions quickly.',
      'Model entities with 3NF/BCNF normalization while planning selective indexes up front.'
    ],
    advanced: [
      'Use composite covering indexes, histograms, and EXPLAIN ANALYZE to eliminate full table scans.',
      'Configure asynchronous replication with GTIDs, delayed replicas, and failover orchestration.',
      'Partition multi-billion row tables and automate housekeeping with the event scheduler.'
    ],
    example: {
      title: 'Monthly revenue report with window functions',
      description: 'Combines fact_sales with dimension tables and uses window functions to rank performers.',
      code: `WITH monthly_sales AS (
  SELECT
    DATE_FORMAT(order_date, '%Y-%m-01') AS month,
    account_id,
    SUM(total_amount) AS revenue,
    ROW_NUMBER() OVER (PARTITION BY DATE_FORMAT(order_date, '%Y-%m-01') ORDER BY SUM(total_amount) DESC) AS rank_in_month
  FROM fact_sales
  GROUP BY month, account_id
)
SELECT month, account_id, revenue
FROM monthly_sales
WHERE rank_in_month <= 5
ORDER BY month DESC, revenue DESC;`
    },
    practiceQuestions: [
      'Design a schema for a ride-sharing marketplace. Explain the primary + covering indexes you would add and why.',
      'Given a slow dashboard query, walk through how you would capture EXPLAIN plans and refactor it to use a summary table.',
      'Sketch a replication + backup strategy that meets an RPO of 5 minutes and RTO of 15 minutes.'
    ],
    tags: ['SQL', 'ACID', 'Indexing', 'Replication'],
    resources: [
      { label: 'Reference Manual', url: 'https://dev.mysql.com/doc/refman/8.0/en/' },
      { label: 'Performance Schema', url: 'https://dev.mysql.com/doc/refman/8.0/en/performance-schema.html' }
    ],
    lastUpdated: '2025-12-01'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Database',
    level: 'Beginner to Advanced',
    effort: '5-7 hrs',
    summary:
      'Structure document models, build aggregation pipelines, and enforce performance budgets with profiling + Atlas tools.',
    basics: [
      'Understand BSON types, embedding vs referencing, and flexible schema governance.',
      'Use CRUD operators, projections, and array modifiers to shape data.',
      'Model queries around working set + index fit in memory to keep latency predictable.'
    ],
    advanced: [
      'Compose multi-stage aggregation pipelines with $facet, $lookup, and $graphLookup for analytics workloads.',
      'Implement change streams and time-series collections for event-driven systems.',
      'Tune sharded clusters with zoned sharding, resharding, and workload isolation.'
    ],
    example: {
      title: 'Behavior funnel aggregation',
      description: 'Detects drop-off across signup, onboarding, and activation steps with a single aggregation.',
      code: `db.events.aggregate([
  { $match: { eventType: { $in: ['signup', 'onboarding', 'activation'] } } },
  { $sort: { userId: 1, timestamp: 1 } },
  {
    $group: {
      _id: '$userId',
      events: { $push: '$eventType' }
    }
  },
  {
    $project: {
      completed: {
        $reduce: {
          input: ['$signup', '$onboarding', '$activation'],
          initialValue: true,
          in: { $and: ['$$value', { $in: ['$$this', '$events'] }] }
        }
      }
    }
  }
]);`
    },
    practiceQuestions: [
      'Model a content management system that supports drafts, versioning, and localized fields.',
      'Write an aggregation that outputs top 3 searched keywords per region using sampled traffic data.',
      'Plan a sharding strategy for an IoT ingest system with 200k writes/sec and regional data gravity.'
    ],
    tags: ['Document DB', 'Aggregation', 'Schema Design'],
    resources: [
      { label: 'Data Modeling Patterns', url: 'https://www.mongodb.com/docs/manual/core/data-modeling-introduction/' },
      { label: 'Aggregation Pipeline', url: 'https://www.mongodb.com/docs/manual/core/aggregation-pipeline/' }
    ],
    lastUpdated: '2025-11-15'
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    level: 'Beginner to Advanced',
    effort: '4-6 hrs',
    summary:
      'Compose resilient UI with hooks, concurrency-minded patterns, and shared data layers that scale across apps.',
    basics: [
      'Solidify component composition, props drilling alternatives, and state colocations.',
      'Use hooks (useState, useEffect, useMemo, useCallback) to coordinate side effects and expensive calculations.',
      'Adopt accessibility patterns (ARIA roles, focus traps, keyboard flows) from the start.'
    ],
    advanced: [
      'Adopt Suspense boundaries, transitions, and streaming server rendering in React 18.',
      'Build shared state with context + reducers or lightweight stores (Zustand, Jotai).',
      'Measure performance via React DevTools flame charts, memoization, and virtualization techniques.'
    ],
    example: {
      title: 'Optimistic updates with server revalidation',
      description: 'Demonstrates concurrent-safe optimistic UI with suspense-aware data fetching.',
      code: `function useUpdateTodo() {
  const [isPending, startTransition] = React.useTransition();
  const client = useQueryClient();
  return (todo) => {
    startTransition(() => {
      client.setQueryData(['todos'], (prev) =>
        prev.map((item) => (item.id === todo.id ? { ...item, ...todo } : item))
      );
    });
    return api.updateTodo(todo).finally(() => client.invalidateQueries(['todos']));
  };
}`
    },
    practiceQuestions: [
      'Build a dashboard that streams live metrics; explain how you would batch renders and avoid tearing.',
      'Refactor a prop-drilled tree into context + reducer; describe memoization strategy.',
      'Implement an accessible command palette with keyboard shortcuts and screen reader support.'
    ],
    tags: ['Hooks', 'Suspense', 'Performance'],
    resources: [
      { label: 'React 18 Docs', url: 'https://react.dev/' },
      { label: 'Performance Optimizations', url: 'https://react.dev/learn/you-might-not-need-an-effect' }
    ],
    lastUpdated: '2025-10-02'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Language',
    level: 'All Levels',
    effort: '6 hrs',
    summary:
      'Understand the runtime deeply: event loop phases, async primitives, modules, and language internals.',
    basics: [
      'Master lexical scope, closures, and prototypes while writing idiomatic ES modules.',
      'Control async flows with Promises, async/await, and generators; avoid unhandled rejection pitfalls.',
      'Use browser + Node debugging hooks (performance.mark, inspect) to reason about execution order.'
    ],
    advanced: [
      'Dive into event loop phases (macrotask, microtask) and scheduling priority in browsers vs Node.',
      'Implement pipelines with Web Workers, SharedArrayBuffer, and Atomics for CPU-heavy work.',
      'Leverage Intl, Temporal (stage 3), and typed arrays for production-grade features.'
    ],
    example: {
      title: 'Microtask vs macrotask scheduler',
      description: 'Illustrates execution order when mixing queueMicrotask, MutationObserver, and Promises.',
      code: `console.log('start');
setTimeout(() => console.log('macrotask'));
queueMicrotask(() => console.log('microtask'));
Promise.resolve().then(() => console.log('promise then'));
console.log('end');
// Output: start, end, microtask, promise then, macrotask`
    },
    practiceQuestions: [
      'Explain how you would polyfill Promise.any and discuss edge cases.',
      'Implement a cancellable fetch helper that cooperates with AbortController.',
      'Design an API rate limiter in Node.js that works in clustered environments.'
    ],
    tags: ['Event Loop', 'Async', 'ES Modules'],
    resources: [
      { label: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
      { label: 'Node.js Event Loop', url: 'https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/' }
    ],
    lastUpdated: '2025-12-05'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps',
    level: 'Intermediate',
    effort: '3-5 hrs',
    summary:
      'Ship reproducible environments with layered images, health checks, and production-ready compose files.',
    basics: [
      'Understand images, containers, registries, and the layered filesystem.',
      'Write Dockerfiles with explicit bases, pinned versions, and deterministic COPY/ENV instructions.',
      'Use docker compose to orchestrate local stacks with networks and volumes.'
    ],
    advanced: [
      'Adopt multi-stage builds, BuildKit caching, and SBOM generation.',
      'Secure containers with rootless mode, seccomp/apparmor profiles, and secrets management.',
      'Optimize CI pipelines with buildx cache exports and registry mirrors.'
    ],
    example: {
      title: 'Multi-stage Dockerfile for Node + Alpine',
      description: 'Outputs a 60MB production image with non-root user and health check.',
      code: `# syntax=docker/dockerfile:1.6
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
USER node
HEALTHCHECK CMD node healthcheck.js || exit 1
CMD ['node', 'server.js']`
    },
    practiceQuestions: [
      'Design a docker-compose stack for MySQL, backend, and worker services with shared networks.',
      'Explain how layer caching works and how you would reorganize a Dockerfile for faster builds.',
      'Outline the steps to shrink an image that currently ships build tooling into production.'
    ],
    tags: ['Containers', 'DevOps', 'Compose'],
    resources: [
      { label: 'Docker Docs', url: 'https://docs.docker.com/' },
      { label: 'Best Practices', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/' }
    ],
    lastUpdated: '2025-09-12'
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Language',
    level: 'Intermediate to Advanced',
    effort: '7-9 hrs',
    summary:
      'Write modern Java 21 code, embrace records + sealed types, and build production APIs with Spring Boot.',
    basics: [
      'Review JVM fundamentals: class loading, JIT vs AOT, and memory regions.',
      'Use records, pattern matching for switch, and sealed hierarchies to model domains.',
      'Compose Spring Boot starters, configuration properties, and validation annotations.'
    ],
    advanced: [
      'Profile applications with JFR + async-profiler to pinpoint allocations and blocking calls.',
      'Adopt reactive pipelines with Project Reactor and virtual threads (Project Loom).',
      'Secure APIs via Spring Security, OAuth2 client credentials, and method-level guards.'
    ],
    example: {
      title: 'Virtual-thread backed request pipeline',
      description: 'Uses an ExecutorService with virtual threads to serve blocking IO efficiently.',
      code: `var executor = Executors.newVirtualThreadPerTaskExecutor();
var server = HttpServer.create(new InetSocketAddress(8080), 0);
server.createContext('/health', exchange -> {
  executor.submit(() -> handle(exchange));
});
server.start();`
    },
    practiceQuestions: [
      'Design a modular monolith with Spring Boot modules; explain interface boundaries.',
      'Implement a rate limited REST controller that surfaces metrics via Micrometer.',
      'Describe how you would migrate from thread pools to virtual threads safely.'
    ],
    tags: ['Spring Boot', 'JVM', 'Virtual Threads'],
    resources: [
      { label: 'Java 21 Docs', url: 'https://docs.oracle.com/en/java/' },
      { label: 'Spring Boot Reference', url: 'https://docs.spring.io/spring-boot/docs/current/reference/html/' }
    ],
    lastUpdated: '2025-12-03'
  }
]);

const lastUpdatedAt = 'December 2025';
