<script>
  import meetupStore from './Meetups/meetups-store'
  import MeetupDetail from './Meetups/MeetupDetail.svelte'
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";

  // let meetups = ;

  let editMode;
  let editedId;
  let page = 'overview';
  let pageData = {}

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
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup meetupId={editedId} on:save={savedMeetup} on:cancel={cancelEdit} />
    {/if}
      <MeetupGrid  
        meetups={$meetupStore}
        on:showdetails={showDetails}
        on:edit={startEdit}
        on:add={() => {editMode = 'edit'}} />
  {:else}
    <MeetupDetail meetupId={pageData.id} on:close={closeDetails} />
  {/if}
</main>
