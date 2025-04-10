export const fileSystem: Record<string, string[]> = {
    "/": ["projects/", "skills/", "links/"],
    "/projects": ["frontend/", "backend/", "mobile/", "resume.pdf"],
    "/projects/frontend": ["react.js", "vue.js", "angular.js"],
    "/projects/backend": ["node.js", "python.js", "java.js"],
    "/projects/mobile": ["react-native.js", "flutter.js"],
    "/skills": ["languages/", "frameworks/", "tools/"],
    "/skills/languages": ["javascript", "typescript", "python", "java"],
    "/skills/frameworks": ["react", "vue", "express", "django"],
    "/skills/tools": ["git", "docker", "aws"],
    "/links": ["github", "twitter", "linkedin", "portfolio"],
  };

export const fileData: Record<string, React.ReactNode> = {
    '/projects/frontend/react.js': <>
        # React.js Project Experience
        
        - Built responsive single-page applications using React and Redux
        - Implemented state management using Context API and hooks
        - Created reusable component libraries with styled-components
        - Experience with React Router for client-side routing
    </>,
    
    '/projects/frontend/vue.js': <>
        # Vue.js Project Experience
        
        - Developed interactive UIs with Vue.js and Vuex
        - Created component-based applications with the Vue CLI
        - Implemented responsive layouts using Vue with Tailwind CSS
        - Experience with Vue Router for SPA navigation
    </>,
    
    '/projects/frontend/angular.js': <>
        # Angular Project Experience
        
        - Built enterprise applications with Angular framework
        - Implemented RxJS for reactive programming patterns
        - Experience with Angular Material for UI components
        - Worked with NgRx for state management
    </>,
    
    '/projects/backend/node.js': <>
        # Node.js Project Experience
        
        - Developed RESTful APIs with Express.js
        - Built real-time applications with Socket.io
        - Implemented authentication using JWT and OAuth
        - Experience with MongoDB and Mongoose ODM
    </>,
    
    '/projects/backend/python.js': <>
        # Python Backend Experience
        
        - Created web applications with Django and Flask
        - Built data processing pipelines with pandas and NumPy
        - Implemented API services with FastAPI
        - Experience with SQL and NoSQL databases
    </>,
    
    '/projects/backend/java.js': <>
        # Java Backend Experience
        
        - Developed enterprise applications with Spring Boot
        - Built microservices architecture with Spring Cloud
        - Implemented RESTful APIs with Java EE
        - Experience with JPA and Hibernate ORM
    </>,
    
    '/projects/mobile/react-native.js': <>
        # React Native Experience
        
        - Developed cross-platform mobile apps for iOS and Android
        - Implemented native functionality using Expo and native modules
        - Created custom UI components with React Native
        - Experience with offline storage and push notifications
    </>,
    
    '/projects/mobile/flutter.js': <>
        # Flutter Experience
        
        - Built cross-platform applications with Dart and Flutter
        - Implemented Material Design and Cupertino widgets
        - Created custom animations and transitions
        - Experience with state management using Provider and BLoC
    </>,
    
    '/projects/resume.pdf': <>
        # Resume
        
        [Download PDF version of my resume with detailed work experience and education]
    </>,
    '/links/github': <>
        # GitHub
        
        - Check out my projects and contributions
        - Visit: [github.com/yourusername](https://github.com/yourusername)
    </>,

    '/links/twitter': <>
        # Twitter
        
        - Follow me for tech updates and thoughts
        - Handle: [@yourtwitterhandle](https://twitter.com/yourtwitterhandle)
    </>,

    '/links/linkedin': <>
        # LinkedIn
        
        - Connect with me professionally
        - Profile: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
    </>,

    '/links/portfolio': <>
        # Portfolio Website
        
        - View my complete portfolio of work
        - Visit: [yourportfolio.com](https://yourportfolio.com)
    </>,

    '/skills/languages/javascript': <>
        # JavaScript
        
        - ES6+ features and modern patterns
        - Asynchronous programming with Promises and async/await
        - Functional programming concepts
        - DOM manipulation and browser APIs
    </>,

    '/skills/languages/typescript': <>
        # TypeScript
        
        - Static type checking and interfaces
        - Advanced type operations and generics
        - Integration with modern frameworks
        - Type-safe development practices
    </>,

    '/skills/languages/python': <>
        # Python
        
        - Python 3.x development
        - Data processing and analysis
        - Web development with frameworks
        - Scripting and automation
    </>,

    '/skills/languages/java': <>
        # Java
        
        - Object-oriented programming
        - Enterprise application development
        - Multithreading and concurrency
        - JVM optimization and performance
    </>,

    '/skills/frameworks/react': <>
        # React
        
        - Modern React with hooks and functional components
        - State management (Redux, Context API)
        - Performance optimization techniques
        - Testing with Jest and React Testing Library
    </>,

    '/skills/frameworks/vue': <>
        # Vue
        
        - Vue 2 and Vue 3 development
        - Vuex state management
        - Single-file components
        - Vue CLI and build tools
    </>,

    '/skills/frameworks/express': <>
        # Express
        
        - RESTful API development
        - Middleware implementation
        - Authentication and authorization
        - API testing and documentation
    </>,

    '/skills/frameworks/django': <>
        # Django
        
        - Full-stack web development
        - Django ORM and database operations
        - Django REST Framework
        - Authentication and admin interfaces
    </>,

    '/skills/tools/git': <>
        # Git
        
        - Version control workflows
        - Branching strategies
        - Collaborative development
        - CI/CD integration
    </>,

    '/skills/tools/docker': <>
        # Docker
        
        - Container creation and management
        - Docker Compose for multi-container apps
        - Dockerization of applications
        - Container orchestration basics
    </>,

    '/skills/tools/aws': <>
        # AWS
        
        - Cloud infrastructure management
        - S3, EC2, Lambda, and DynamoDB
        - Serverless architecture
        - CloudFormation and IaC
    </>
};