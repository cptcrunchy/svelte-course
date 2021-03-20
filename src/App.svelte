<script>
  import meetupStore from './Meetups/meetups-store'
  import MeetupDetail from './Meetups/MeetupDetail.svelte'
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";
  import Error from "./UI/Error.svelte";

  // let meetups = ;

  let editMode;
  let editedId;
  let page = 'overview';
  let pageData = {}
  let isLoading = true;
  let error;

  fetch('https://test-firebase-logins.firebaseio.com/meetups.json')
  .then(res => {
    if(!res.ok) throw new Error('An error occurred while fetching meetups');
    return res.json();
  })
  .then(data => {
    const loadedMeetups = []
    for(const key in data){
      loadedMeetups.push({
        ...data[key],
        id: key
      })
    }
    setTimeout(() => {
      isLoading = false;
      meetupStore.setMeetups(loadedMeetups.reverse())
    }, 2000)
  })
  .catch(err => {
    error = err;
    isLoading = false;
    console.error(err)
  })


  function savedMeetup() {
    editMode = null;
    editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null
  }

  function showDetails(event){
    page = 'details';
    pageData.id = event.detail
  }

  function closeDetails(){
    page = 'overview';
    pageData = {} 
  }
  function startEdit(event){
    editMode = 'edit'
    editedId = event.detail
  }

  function clearError() {
    error = null;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

{#if error}
<Error message="{error.message}" on:cancel={clearError} />
{/if}
<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup meetupId={editedId} on:save={savedMeetup} on:cancel={cancelEdit} />
    {/if}
    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid  
        meetups={$meetupStore}
        on:showdetails={showDetails}
        on:edit={startEdit}
        on:add={() => {editMode = 'edit'}} />
    {/if}
  {:else}
    <MeetupDetail meetupId={pageData.id} on:close={closeDetails} />
  {/if}
</main>
