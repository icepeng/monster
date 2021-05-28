import { BoardApi } from '../models/board-api';

export const generateId = () =>
  [...Array(32)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');

export const boardMock: BoardApi = {
  board: {
    id: '0',
    title: 'Trello Resources',
  },
  lists: [
    {
      id: '0',
      boardId: '0',
      index: 0,
      title: 'Tips',
    },
    {
      id: '1',
      boardId: '0',
      index: 1,
      title: 'Usage Examples',
    },
    {
      id: '2',
      boardId: '0',
      index: 1,
      title: 'Native Clients',
    },
    {
      id: '3',
      boardId: '0',
      index: 1,
      title: 'Browser Extensions',
    },
    {
      id: '4',
      boardId: '0',
      index: 1,
      title: 'Integrations/Utilities',
    },
  ],
  cards: [
    {
      id: '0',
      listId: '0',
      index: 0,
      title: 'Use the keyboard shortcuts',
      description: `You can do things like
  
* See all the shortcuts [?]
* Assign (or remove) yourself from a card by hitting [spacebar]
* Add/remove labels from cards [1-6]
* Archive cards [c]
* Open the "Boards" menu [b]
* Vote [v] (great for public boards like this one ... try pressing the 'v' key now)
* etc

Often, you can just hover over a card in a list with your mouse and then use a keyboard shortcut. (Which can make it easy to add labels/members/etc to cards without needing to open them)`,
      due: null,
      dueComplete: false,
    },
    {
      id: '1',
      listId: '0',
      index: 1,
      title: '@mention someone in a comment to give them a notification',
      description: `If you type @ plus a first name, last name, username, or initials, it will autocomplete the username.
  
          If you click the member icon in the bottom right of the comment field, you can add all board members or commenters to the message. You can use @card to notify all members of a card or @board to notify all members of the board.
          
          Mentions generate notifications for those mentioned, so please try it on your boards, but not here. Thanks!`,
      due: null,
      dueComplete: false,
    },
    {
      id: '2',
      listId: '0',
      index: 2,
      title: 'Add formatting to your card descriptions using markdown',
      description: `Ever want to have
  
          Bulleted lists
          Bold text
          Italic text
          code
          ... in your descriptions and comments?
          
          You can, if you format it using markdown.
          
          For example:
          
          **Some text** becomes Some text
          
          _Some text_ becomes Some text
          
          for(var i=0; i<10; i++) {
            alert(i);
          }
          If you want to avoid the prevent the text from getting formatted, surround it in , e.g.
          
          will become foo_bar_baz`,
      due: null,
      dueComplete: false,
    },
    {
      id: '3',
      listId: '0',
      index: 3,
      title: 'Use the card composer shortcuts',
      description: `When adding a card, if you type: "#Feature New Widget @Bobby" it will
  
          create a card called New Widget
          add the Feature label (assuming you have one called "feature")
          assign it to Bobby (assuming he's on your board)`,
      due: null,
      dueComplete: false,
    },
    {
      id: '4',
      listId: '0',
      index: 4,
      title: 'Enable Desktop Notifications in Chrome and Safari 6',
      description: `When this is enabled in Chrome, you will receive desktop notifications when someone @mentions you on a card
  
          Click the notifications button in the header.
          Select "Allow Desktop Notifications" from the menu.
          You'll need to do this once per browser. After doing this, you'll get a desktop notification anytime someone @mentions you on a card.
          
          If you are using chrome and you don't see the "Allow Notifications" link, make sure that you're allowing notifications by checking chrome://settings/content (Settings > Under the Hood > Privacy > Content settings ... > Notifications). You can see a list of accepted sites In Safari in "Preferences" > "Notifications".`,
      due: null,
      dueComplete: false,
    },
    {
      id: '5',
      listId: '0',
      index: 5,
      title: 'Trello Dojo ebook',
      description: `A Trello user wrote a guide on learning Trello: Trello Dojo`,
      due: null,
      dueComplete: false,
    },
    {
      id: '6',
      listId: '0',
      index: 6,
      title: 'Create an "Application Shortcut" in Chrome',
      description: `Go to trello.com
          Click the wrench, "Tools", "Application Shortcuts..."
          Select "Pin to Taskbar"
          Now you can run Trello like a standalone application`,
      due: null,
      dueComplete: false,
    },
    {
      id: '7',
      listId: '1',
      index: 0,
      title: 'Trello Inspiration - A collection of Trello boards',
      description: `Need some Trello Inspiration?
          Our team has created a page where you can view curated boards from the Trello community and get inspired by other people's uses of Trello. Tags like 'Business', 'Productivity', 'Lifestyle', 'Education' will help you find the right boards.
          
          Check it out and get inspired! Trello
          
          Did you create an inspiring board yourself and would like to share that with with the Trello community? Feel free to shoot us an email at inspiration@trello.com`,
      due: '2020-11-12T08:00:00.000Z',
      dueComplete: false,
    },
    {
      id: '8',
      listId: '1',
      index: 1,
      title: 'Software Development',
      description: `Trello Development Trello
          UserVoice (blog post: http://goo.gl/p0Ekq)
          Code 52 (several examples at Trello)
          Trello Apps (several examples at Trello)
          University of St. Andrews (http://stawebteam.wordpress.com/2011/11/04/moving-our-team-task-board-online-to-trello/)
          Scoreoid (https://trello.com/b/8s2KujTX)
          fireBwall (https://trello.com/b/cHOdh1m9)
          pixelTail Games (https://trello.com/b/mfdDkxtt)
          Regression Testing
          Adobe Brackets (Trello)`,
      due: null,
      dueComplete: false,
    },
    {
      id: '9',
      listId: '1',
      index: 2,
      title: 'Wedding Planning',
      description: `Say Yes To Less Stress: Using Trello To Plan A Wedding
  
          Long term planning - Template: Wedding Command Center
          Seating arrangement - Wedding Seating Arrangement
          Bridesmaid board - Wedding Party
          Wedding day timeline - Wedding Day Timeline
          Thank you cards - Wedding Thank You Cards`,
      due: '2021-06-03T08:00:00.000Z',
      dueComplete: false,
    },
    {
      id: '10',
      listId: '1',
      index: 3,
      title: 'Personal Organization',
      description: `Video Game Backlog Trello
          Planned movie/television watching ("Future releases", "Up and Coming", "Following", "On Hiatus", "Completed")`,
      due: null,
      dueComplete: false,
    },
    {
      id: '11',
      listId: '1',
      index: 4,
      title: 'Education',
      description: `Team co-ordinating a class project Sociology 101 Group Project`,
      due: null,
      dueComplete: false,
    },
    {
      id: '12',
      listId: '1',
      index: 5,
      title: 'Job Hunting / Career Development',
      description: `The Job Decision Matrix: How to make your next big move (CEK's Career Decision Matrix)`,
      due: null,
      dueComplete: false,
    },
    {
      id: '13',
      listId: '1',
      index: 6,
      title: 'Recruiting',
      description: `"Recruitment Candidate tracking. As candidates move from resume, to phone screen, to 1st interview, we can see a dashboard of fulfilling open positions. We use labels to see if progress is blocked waiting on the candidate or on someone internally." - David Wihl`,
      due: null,
      dueComplete: false,
    },
    {
      id: '14',
      listId: '1',
      index: 7,
      title: 'Fitness / Diet / Workout planing',
      description: `"I put personal fitness goals as separate cards in sprint list (mimicing our company wide two week sprints), and move them to a done column as they are completed. I put longer term goals in a different list." - David Wihl`,
      due: null,
      dueComplete: false,
    },
    {
      id: '15',
      listId: '1',
      index: 8,
      title: 'Crowd Sourcing',
      description: `Khan Academy Exercises (Trello)`,
      due: null,
      dueComplete: false,
    },
    {
      id: '16',
      listId: '1',
      index: 9,
      title: 'User Templates',
      description: `See Trello`,
      due: '2021-05-22T08:00:00.000Z',
      dueComplete: false,
    },
    {
      id: '17',
      listId: '2',
      index: 0,
      title: 'Know of other existing clients...? (Comment to let us know)',
      description: `Note: this is not a place to add a request for clients/apps for trello, but to let us know about other clients that have been built by outside developers.`,
      due: null,
      dueComplete: false,
    },
    {
      id: '18',
      listId: '2',
      index: 1,
      title: 'Android (Official)',
      description: `The app has been released!
  
          Get it from the Play store here: Trello: Organize anything with anyone, anywhere! - Apps on Google Play`,
      due: null,
      dueComplete: false,
    },
    {
      id: '19',
      listId: '2',
      index: 2,
      title: 'iPhone and iPad App (Official)',
      description: `‎Trello: organize anything!
  
          Connecting to the iTunes Store.`,
      due: null,
      dueComplete: false,
    },
    {
      id: '20',
      listId: '2',
      index: 3,
      title: 'Mac (Official)',
      description: `Get it here: ‎Trello`,
      due: null,
      dueComplete: false,
    },
    {
      id: '21',
      listId: '2',
      index: 4,
      title: 'Windows (Official)',
      description: `Get it here: Get Trello - Microsoft Store`,
      due: null,
      dueComplete: false,
    },
    {
      id: '22',
      listId: '3',
      index: 0,
      title: 'Scrum for Trello',
      description: `Both extensions are available at http://scrumfortrello.com/
  
          This is a 3rd party Extension (not developed by Trello)
          
          Scrum for Trello Chrome Extension
          Scrum for Trello Firefox Extension
          Scrum for Trello Safari extension`,
      due: '2021-06-15T08:00:00.000Z',
      dueComplete: false,
    },
    {
      id: '23',
      listId: '3',
      index: 1,
      title: 'Trello App (Official)',
      description: `https://chrome.google.com/webstore/detail/oflhioojkbelepjlnafgmgkkjhojphcg
  
          (It's pretty simple right now, it just gives you a link to open Trello on your "New Tab" page)`,
      due: null,
      dueComplete: false,
    },
    {
      id: '24',
      listId: '3',
      index: 2,
      title: 'Export for Trello',
      description: `Export for Trello - A Chrome extension that allows you export data from your Trello board to Excel.
  
          Export for Trello - Modified - This modified version—source code here—includes the following additional fields:
          
          Card short ID
          Member who created the card
          DateTime card was created
          Member who moved card to "Done" list
          DateTime card was moved to "Done" list
          It can be installed manually by downloading the file and dragging it into the Chrome extensions page.
          
          NOTE: The dates are in ISO8601 format. Check out this post for some VBA code you can use to parse ISO8601 dates.`,
      due: null,
      dueComplete: false,
    },
    {
      id: '25',
      listId: '3',
      index: 3,
      title: 'Gmail to Trello',
      description: `https://chrome.google.com/webstore/detail/gmail-to-trello/oceoildfbiaeclndnjknjpfaoofeekgl?hl=en
  
          Please note that this is a 3rd party extension that is not supported by Trello or Fog Creek Software`,
      due: null,
      dueComplete: false,
    },
    {
      id: '26',
      listId: '3',
      index: 4,
      title: 'Harvest Time Tracking Power-Up',
      description: `Track time seamlessly without ever leaving Trello. Simply enable the Harvest Power-Up, and start tracking time on your cards in Trello. It’s as if time tracking was already built in.
  
          Every Trello card shows how much time has been tracked to it. Your Harvest timesheets also link to the Trello cards, so it's easy to see which card each time entry is related to.
          
          Turn tracked time on cards into insightful reports in Harvest or invoices to bill your clients.
          
          Read Harvest's help doc for more info.
          
          You can also get the Harvest for Trello Chrome extension and read the blog post.`,
      due: null,
      dueComplete: false,
    },
    {
      id: '27',
      listId: '3',
      index: 5,
      title: 'Trello My Cards',
      description: `This is a 3rd party Extension (not developed by Trello)
  
          Isn't available (yet) in the Chrome Web Store, but you can install it from
          
          keboola/trello-my-cards`,
      due: null,
      dueComplete: false,
    },
    {
      id: '28',
      listId: '3',
      index: 6,
      title: 'Card Numbers for Trello',
      description: `"Adds the card number to the top left corner of cards to allow for easier discussion at stand ups and when working in teams."
  
          Get Card Numbers for Trello extension in the Chrome store:
          
          Card Numbers for Trello
          
          Note: This is a 3rd party extension that is not developed by Trello.`,
      due: '2021-06-30T08:00:00.000Z',
      dueComplete: false,
    },
    {
      id: '29',
      listId: '3',
      index: 7,
      title: 'Capture for Trello',
      description: `Take a screenshot and put it in a Trello card in seconds
          Take a screenshot of any webpage and create a Trello card that contains it in seconds.
          
          You can draw rectangles and arrows of different colors over the screenshot to point out what's important.
          
          Like Skitch or JIRA Capture, for Trello.
          
          Note: This is a 3rd party extension that is not developed by Trello.
          
          Capture for Trello Chrome Extension`,
      due: null,
      dueComplete: false,
    },
    {
      id: '30',
      listId: '4',
      index: 0,
      title: 'Trello Outlook Addon',
      description: `Trello Outlook Addon`,
      due: null,
      dueComplete: false,
    },
    {
      id: '31',
      listId: '4',
      index: 1,
      title: 'Burndown Time Estimates',
      description: `Burndown Charts for Trello`,
      due: null,
      dueComplete: false,
    },
    {
      id: '32',
      listId: '4',
      index: 2,
      title: 'Zapier',
      description: `Trello Integrations | Connect Your Apps with Zapier
  
          Integrate trello with other services like twitter and google chat
          
          If you have any questions, you can contact Wade at contact@zapier.com`,
      due: null,
      dueComplete: false,
    },
    {
      id: '33',
      listId: '4',
      index: 3,
      title: 'Corrello',
      description: `Dashboards for Scrum and Kanban teams using Trello | Corrello
  
          Corrello's dashboards and reports bring together activity from across your Trello boards.`,
      due: null,
      dueComplete: false,
    },
    {
      id: '34',
      listId: '4',
      index: 4,
      title: 'CloudMagic',
      description: `"The email app connected to your Trello account. Emails contain tasks, you can now add it to your Trello board without leaving your email" CloudMagic`,
      due: null,
      dueComplete: false,
    },
  ],
  labels: [
    {
      id: '0',
      boardId: '0',
      title: 'Feedback',
      color: '#EB5A46',
    },
    {
      id: '1',
      boardId: '0',
      title: 'Essential',
      color: '#61BD4F',
    },
  ],
  cardLabels: [
    {
      id: '0',
      cardId: '0',
      labelId: '1',
    },
    {
      id: '1',
      cardId: '1',
      labelId: '1',
    },
    {
      id: '2',
      cardId: '0',
      labelId: '0',
    },
  ],
  comments: [
    {
      id: '0',
      cardId: '0',
      content: 'Thank you',
    },
    {
      id: '1',
      cardId: '0',
      content: 'Thank you',
    },
    {
      id: '2',
      cardId: '0',
      content: 'Thank you',
    },
    {
      id: '3',
      cardId: '0',
      content: 'Thank you',
    },
    {
      id: '4',
      cardId: '0',
      content: 'Thank you',
    },
  ],
};
