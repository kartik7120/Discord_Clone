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
- [ ] Settigs of a channel

#### Idea for passing namespace connection 
- Create a context and pass it down the channel
- Try not using a function and use value passed by context api

#### Components where channel socket is referenced
- Left Column
- Middle Column
- Channel