import { writable } from 'svelte/store'
import { getItemIndex } from '../helpers/arrayHelpers'
const meetups = writable([])

const meetupStore = {
    subscribe: meetups.subscribe,
    setMeetups: meetupList => {
        meetups.set(meetupList)
    },
    addMeetup: meetupData => {
        meetups.update(items => [meetupData, ...items])
    },
    updateMeetup: (meetupId, meetupData) => {
        meetups.update(items => {
            const meetupIndex = getItemIndex(items, meetupId);
            const updatedMeetup = {...items[meetupIndex], ...meetupData };
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups
        })
    },
    deleteMeetup: (meetupId) => {
        meetups.update(items => {
            return items.filter( ({id}) => id !== meetupId)
        })
    },
    toggleFavorite: (meetupId) => {
        meetups.update(items => {
            const updatedMeetup = { ...items.find(m => m.id === meetupId) };
            updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
            const meetupIndex = getItemIndex(items, meetupId);
            const updatedMeetups = [...items];
            updatedMeetups[meetupIndex] = updatedMeetup;
            return updatedMeetups;
        })
    },
}

export default meetupStore