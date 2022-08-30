# Discord (mini) clone

## Features to be included

- User settings page
  - Profile page
  - Logout option
  - connections
  - Friend request
- Ability for a user to create a server and invite people on that server
- channels

### Features to implement in a single channel

- [ ] Make three columns
- [ ] Make a user bar in the first column
- [ ] Ability to send messages , images and videos

Components to be used in creating the first column

- Menu for upper half - options to be noted from discord
- Accolodian
- hash icon
- Indicator for profile

### Stepes to taken to make the middle column scrollable

- Make a ordered list
- Make is scrollable
- Add li along with other messages inside the widget

### Adding rooms to a particular server

- Users will be able to create rooms for a particular server
- Each room will be seperate from other one

### Feature idea for right column

All the people who are connect to a particular room will be shown in that column

#### Left column

- [x] Make the navLink
- [ ] Add ability to group items in a category
- [ ] Settings of a channel

#### Idea for passing namespace connection

- Create a context and pass it down the channel
- Try not using a function and use value passed by context api

#### Components where channel socket is referenced

- Left Column
- Middle Column
- Channel

#### Features to be added

- [ ] Add profile using Auth0
- [ ] Fix issue of chat reloading when typing
- [ ] fix issue for multiple a user sending two or messages at the same time
- [ ] Add how many users are connected to a single room
- [ ] Add ability to add videos , images and linked
- [x] Add stickers in the text area
- [ ] Add grouping chats by category

#### Bonus features

- [x] The messages will be visible to all the Users that are in the chat app (using WebSockets)
- [x] When a new User joins the chat, a message is displayed to all the existing Users
- [ ] Messages are saved in a database
- [ ] User can send images, videos and links which will be displayed properly
- [x] User can select and send an emoji
- [ ] Users can chat in private
- [ ] Users can join channels on specific topics

#### things to do

- Fix bug of socket loading same user multiple times
- connect database and save messages in the database
- Make a landing page
- Make a user identify in the backend and store it's information

##### Routes

- [x] Create rooms
- [x] Delete rooms
- [x] Delete Channels
- [ ] Save messages in the database
- [ ] Ability to search several other servers and add them to the user schema
- [x] Make a component so that user can join different servers
- [x] Make so that a user can leave the server
- [ ] Make the user join the default room on visiting a server
