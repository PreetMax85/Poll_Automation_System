/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Backend API Documentation',
      items: [
        'api/overview',
        {
          type: 'category',
          label: 'Authentication',
          items: [
            'api/auth/overview',
            'api/auth/signup',
            'api/auth/login',
            'api/auth/verify',
            'api/auth/change-password',
          ],
        },
        {
          type: 'category',
          label: 'Users',
          items: [
            'api/users/overview',
            'api/users/get-by-firebase-uid',
          ],
        },
        {
          type: 'category',
          label: 'Live Quizzes',
          items: [
            'api/livequizzes/overview',
            'api/livequizzes/create-room',
            'api/livequizzes/get-room',
            'api/livequizzes/create-poll',
            'api/livequizzes/generate-questions',
            'api/livequizzes/submit-answer',
            'api/livequizzes/get-results',
            'api/livequizzes/end-room',
          ],
        },
        {
          type: 'category',
          label: 'GenAI',
          items: [
            'api/genai/overview',
            'api/genai/generate-transcript',
            'api/genai/segment-transcript',
            'api/genai/generate-questions',
            'api/genai/generate-course-items',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Frontend URLs',
      items: [
        'frontend/overview',
        'frontend/student-routes',
        'frontend/teacher-routes',
      ],
    },
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;