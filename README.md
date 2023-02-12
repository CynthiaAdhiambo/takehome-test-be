# Take Home Test for Junior SWE

In-person coding interviews can be stressful, and can hide some people's full potential. A take-home test gives you the chance showcase your talent by working in your own space, and on your own time.

We understand you may have time constraints, so we've made this as simple as possible to evaluate the skill and tech stack you will be using in your day-to-day here at Namiri.

## The Task

Your mission will be to build a web API that can be used to play a Futurama Trivia game. It's possible to get the list of questions from [Sample API's Futurama questions endpoint](https://api.sampleapis.com/futurama/questions). The API will need to support the following features:

- A game session will have 3 questions
- Present the question its list of possible answers
- The player will be able to select one answer
- The player will be able to see if their answer was correct or incorrect
- The player will be able to see their score at the end of the game

Feel free to use Javascript or Typescript to build the API. You can use any database you like, but we recommend using PostgreSQL. Use npm modules as you see fit, you do not have to reinvent the wheel if you can avoid it. Remember to take notes in the [notes section](#your-notes).

## Evaluation criteria

We will use this project as the basis for evaluating your skill as a developer.

While we'll be gathering as much data as we can from your implementation, our evaluation will focus on these core concepts:

- Solution Integrity: Is your solution complete and functional?
- Design: What choices did you make in regards to functionality, readability, maintainability, extendability, and did you make appropriate use of language/framework features?
- Testability: Have you considered how you'd test your code?
- Documentation: Have you provided context for decisions and assumptions that you've made?

## Your Notes

_TODO: Please leave us any notes about your experience with this challenge here._

    This challange allowed me to test my skills from design to implementation to testing to documentation and to think about the edge cases that may arise as one plays. The different roles that need to be added. The wholesomeness of the project and to learn new things like how to use Postgres with Node JS. Even though i din't use Postgres in the project, this challange has prompted me to go figure it out.

    During this challange, i mainly focused on the happy path to ensure that everything worked correctly as per the task specifications. I intend to continue with this challange until i have a fully operational Futurama game as per my production readiness notes

## Time Spent

_TODO: Give us a rough estimate of the time you spent working on the test. If you spent time learning in order to do this project please feel free to let us know that too. This makes sure that we are evaluating your work fairly and in context. It also gives us the opportunity to learn and adjust our process if needed._

    Three days were spent learning and 2 days spent on implementation, documentation and bug fixing. I also added routes errors(e.g not foound and other route errors), CORS handling, logging and controllers in readiness for the MVC architecture.

    I am faced with an error "_Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client_ " that i have been unable to resolve. This error occurs when user tries to post the answers for the game. The response in the db is as expected but the server on teh terminal throws an error. O am still working to try fix this error

## Assumptions

_TODO: Did you find yourself needing to make assumptions to complete this? If so, what were they, and how did they impact your design/code?_

    ## Assumption 1: solution
    For each question, the corresponding answer needs to be attached.
    Therefore there are 2 ways this can be solved:
        1. Get all the 3 questions at once(using the /get/play endpoint) , then send 3 answers (each with the question id attached)
        2. For each question asked, player should first answer it before being asked the next question

    ## Assumption 2:
    Each question answered correctly warrants one point

    ## Assumption 3:
    Each session only allows for one player to play at a time

    ## Assumption 4:

## Production Readiness

_TODO: Provide us with some notes about what you would do next if you had more time. Are there additional features that you would want to add? Specific improvements to the code you would make? Any additional testing or documentation?_

## Testing

**Validation testing** to analyzes API projects based on three distinct sets of criteria: The API's usability as a product, its transactional behavior and its operational efficiency. i.e:

    Is the API designed in a way that meets its product goals or solves the problem it's supposed to?
    Were there any major coding missteps that would push the API in an unsustainable direction?
    Is the API accessing data in accordance with predefined policies?
    Is the API storing data in accordance with security or compliance rules?
    Would any code alterations improve the API's overall functionality?

**Functional testing** to ensures the API performs exactly as it is supposed to by analyzes specific functions within the codebase to guarantee that the API functions within its expected parameters and can handle errors when the results are outside the designated parameters.

**Reliability testing** to ensure the API can produce consistent results and the connection between platforms is reliable.

## Better Design & Optimization

    1. Adding user roles to better track the players scores depending on the authenticated users (individual player sessions instead of anonymous players )
    2. Admins to be able to add, update, get list and delete questions that the players will fetch
    3. Use POST method for player endpoints so as to attach player's each question with its corresponding answer in the same object instead of having separate get/post endpoints
    4. Ensure that for all the questions id's player fetched from the /questions/get/play endpoint, are answered in the /questions/post/play endpoint (3 question id's warrants 3 answers and any question not answered warrants a zero score)
    5. Check for any duplicates question id's when answering questions hence preventing the same object to be created more than once
    6. Have a score board of sorts to show top 3 players or top 10 players
    7. Adding player's position in the game according to other players as well
    8. Each player should answer one question before going to the next hence they need to be logged in
    9.

## Database

    The recommended database was Postgres but i used Mongo instead since it's farmiliar. Given more time i would have learnt how to use Postgres and Node Js to meet the requirements.
