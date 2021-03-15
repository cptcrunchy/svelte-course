<script>
  import { createEventDispatcher } from 'svelte'
  import MeetupItem from "./MeetupItem.svelte";
  import FilterMeetup from "./FilterMeetup.svelte";
  import Button from '../UI/Button.svelte'

  export let meetups;

  const dispatch = createEventDispatcher();

  let favsOnly = false;
  $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups;

  function setFilter(event){
    favsOnly = event.detail === 1;
  }
</script>

<section id="meetup-controls">
  <FilterMeetup on:select={setFilter}/>
  <Button on:click={() => dispatch('add')}>New Meetup</Button>
</section>
<section id="meetups">
  {#each filteredMeetups as meetup}
    <MeetupItem 
      id={meetup.id}
      title={meetup.title}
      subtitle={meetup.subtitle}
      description={meetup.description}
      imageUrl={meetup.imageUrl}
      email={meetup.contactEmail}
      address={meetup.address}
      isFav={meetup.isFavorite}
      on:showdetails
      on:edit />
  {/each}
</section>


<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>