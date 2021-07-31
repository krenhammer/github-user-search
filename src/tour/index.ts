
import { store } from "../state";

const style = {
    backgroundColor: "#282A36",
    color: "white",
    borderRadius: "15px",
  }

export const tourSteps = [
    {
        selector: '[data-tut="tour-user-search"]',
        content: 'Use this area to search Github Users.',
        style: style,
    },
    {
        selector: '[data-tut="tour-user-search"]',
        content: "Enter some text to run a search. (i.e. 'kren')",
        style: style,
        action: () => {
            store.userFilter='kren'
        },
    },
    {
        selector: '[data-tut="tour-pagination"]',
        content: 'This is the Current and Total Pages of Users.',
        style: style,
        action: () => {
            store.userFilter='kren'
        },
       
    },
    {
        selector: '[data-tut="tour-page-forward"]',
        content: 'Click here to Page Forward.',
        style: style,
        action: () => {
            store.userFilter='kren'
        },
       
    },
    {
        selector: '[data-tut="tour-page-back"]',
        content: 'Click here to Page Back.',
        style: style,
        action: () => {
            store.userFilter='kren'
        },
       
    },
    {
        selector: '[data-tut="tour-total-users"]',
        content: 'This is the Current and Total User counts.',
        style: style,
        action: () => {
            store.userFilter='kren'
        },
    },
    {
        selector: '[data-tut="tour-users"]',
        content: 'Click any of the User images to get more details',
        style: style,
        action: () => {
            store.userFilter='kren'
        },
    },
    // {
    //     selector: '[data-tut="tour-users"]',
    //     content: 'Let\'s click one',
    //     style: style,
    //     action: () => {
    //         location.href = '#/user/krenhammer'
    //     },
    // },
    {
        selector: '[data-tut="tour-user-avatar"]',
        content: 'Click here to go to the selected User\'s Github home page',
        style: style,
        action: () => {
            location.href = '#/user/krenhammer'
        },
    },
    {
        selector: '[data-tut="tour-follow-toggle"]',
        content: 'Click here to go to toggle the selected User\'s Followings and Followers',
        style: style,
        action: () => {
            location.href = '#/user/krenhammer'
        },
    },
    {
        selector: '[data-tut="tour-follow"]',
        content: 'Click one of the images to view a Followers/Following User\'s details',
        style: style,
        action: () => {
            location.href = '#/user/krenhammer'
        },
        
    },
    {
        selector: '[data-tut="tour-all-followers"]',
        content: 'Click here to see ALL the selected User\'s Followings/Followers',
        style: style,
        action: () => {
            location.href = '#/user/krenhammer'
        },
    },
    {
        selector: '[data-tut="tour-repos"]',
        content: 'Hover to get Repo stats (Stars, Forks, Last Commit Date, etc.) and Click navigate to the Repo home on Github',
        style: style,
        action: () => {
            location.href = '#/user/krenhammer'
        },
    },
    {
        selector: '[data-tut="tour-back"]',
        content: 'Click Here to go Back.',
        style: style,
        action: () => {
            location.href = '#/user/krenhammer'
        },
    },
    {
        selector: '[data-tut="tour-repo"]',
        content: 'Click Here for the source of this project.',
        style: style,
        action: () => {
            location.href = '#/search/kren/1'
        },
    },
   
  ];
  