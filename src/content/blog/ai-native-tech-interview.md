One-Pager: Agentic Full-Stack Software Engineering Interview Format
Objective:
To transform the software engineering interview into a real-world, AI-native, full-stack challenge that emphasizes compound engineering, meta-prompting, and practical problem-solving.
Overview of the Interview Process:
Real-World PR Task:

 Candidates start with a sloppy, AI-generated pull request (PR) and need to turn it into a clean, mergeable state. This focuses on real-world coding and improvement rather than abstract algorithm challenges.


Dev Environment and Tools:

 Candidates work in a resettable dev server environment. They can add tools or sub-agents (e.g., a Claude code skill) to solve tasks, encouraging them to think about long-term, reusable solutions.


Meta-Prompting and Context Awareness:

 Before coding, candidates engage in meta-prompting. They help the agent understand the scenario, refine the prompts, and identify gaps—demonstrating a product engineer mindset and ensuring the AI has the right context. They should be mindful of the context window and recognize when new rules or features are needed.


End-to-End Testing and Feedback Loops:

 Candidates encounter a rough structure of end-to-end tests: one that works, one broken by the PR changes, and a new one they must add for the updated functionality. They need to fix the broken test and implement a new test, showing that they understand the importance of testing and the feedback loop.


Design Bugs and UI Fixes:

 Alongside backend changes, candidates must also fix a small design bug in the UI, ensuring they can handle full-stack responsibilities and think holistically.


Compound Engineering Focus:

 A key metric is how well candidates build solutions that compound over time. We look for their ability to improve infrastructure, add reusable tools, and think beyond one-off fixes.


Relaxed but Recorded Sessions:

 Sessions are recorded with voice-to-text enabled, but candidates can work without feeling watched in real-time, allowing them to be more comfortable and natural in their workflow.


Conclusion:
This full-stack interview format ensures candidates engage with the entire development process, from meta-prompting and planning to coding, testing, and UI fixes, all while focusing on long-term, compound engineering practices. It provides a holistic and practical assessment of their skills.


———


Tech Spec for V0.1 Interview Environment
Repository Setup:
Use a full-stack repo with Supabase for the backend.


Main branch is the clean baseline; create a separate branch for the candidate starting point with the AI-generated PR and broken tests.


Include a seed file if needed to reflect new features or settings.


Hosting Environment:
Set up a VM or use Docker containers to run the full stack (backend, frontend, and any other services).


Each candidate session spins up a fresh instance of this environment.


Web-Based IDE:
Integrate a web-based VS Code (like code-server) so candidates can code directly in the browser.


Assign each session a unique session ID for tracking and recording.


Recording and Session Management:
Automatically start recording each session when a candidate logs in.


Store recordings for later review to see the candidate’s entire process.



Now, as for things you might be missing or might want to consider:
Authentication and User Management:

 You’ll need a simple login system for candidates to access their session. You could use something lightweight or even Supabase’s built-in auth features.


Automated Provisioning and Cleanup:

 Think about how you’ll automatically spin up and tear down environments for each candidate. Maybe a script that sets up the VM or container, applies the repo branch, and then cleans up afterward.


AI Prompt and Context Handling:

 Consider how you’ll manage the AI prompts and context window for each session. You might want a way to log what prompts are used and how the candidate interacts with the AI so you can review that aspect too.


Documentation and Instructions:

 Make sure you have clear documentation for candidates so they know what the expectations are. A simple readme or guide in the repo can help them get started smoothly.



