<script>
  import meetupStore from './meetups-store'
  import { createEventDispatcher } from 'svelte'
  import TextInput from '../UI/TextInput.svelte'
  import Button from '../UI/Button.svelte'
  import Modal from '../UI/Modal.svelte'
  import { isEmpty, isValidEmail } from '../helpers/validation.js'

  export let meetupId = null;

  let title = '',
      subtitle = '',
      address = '',
      email = '',
      description = '',
      imageUrl = '';

  if(meetupId){
    const unsubscribe = meetupStore.subscribe(items => {
        const selectedMeetup = items.find( ({id}) => id === meetupId);
        title = selectedMeetup.title;
        subtitle = selectedMeetup.subtitle;
        address = selectedMeetup.address;
        email = selectedMeetup.contactEmail;
        description = selectedMeetup.description;
        imageUrl = selectedMeetup.imageUrl;
    })
    unsubscribe();
  }
  
  const dispatch = createEventDispatcher();
  

  $: titleValid = !isEmpty(title);
  $: subTitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: descriptionValid = !isEmpty(description);
  $: emailValid = isValidEmail(email);
  $: formIsValid = [titleValid, subTitleValid, addressValid, emailValid, descriptionValid].every(Boolean);
      
  function submitForm() {
    const meetupData = {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      contactEmail: email,
      address: address
    };
    if(meetupId){
        fetch(`https://test-firebase-logins.firebaseio.com/meetups/${meetupId}.json`, {
          method: "PATCH",
          body: JSON.stringify(meetupData),
          headers:{ 'Content-Type': 'application/json' }
        }).then(res => {
          if(!res.ok) throw new Error('An error occurred');
          meetups.updateMeetup(meetupId, meetupData)
        }).catch(err => {
          console.error(err)
        })
        meetupStore.updateMeetup(meetupId, meetupData);
    } else {
        fetch("https://test-firebase-logins.firebaseio.com/meetups.json", {
          method: 'POST',
          body: JSON.stringify({...meetupData, isFavorite: false}),
          headers:{ 'Content-Type': 'application/json' }
        })
        .then(res => {
          if(!res.ok) throw new Error('An error occurred.');
          return res.json()
        })
        .then(data => {
          meetupStore.addMeetup({
            ...meetupData,
            isFavorite: false,
            id: data.name
          })
        })
        .catch(err =>{
          console.error(err)
        })
        // meetupStore.addMeetup(meetupData);
    }
    dispatch('save')
  }

  function deleteMeetup() {
    fetch(`https://test-firebase-logins.firebaseio.com/meetups/${meetupId}.json`, {
          method: "DELETE",
         }).then(res => {
          if(!res.ok) throw new Error('An error occurred');
          meetups.deleteMeetup(meetupId)
        }).catch(err => {
          console.error(err)
        })
      dispatch("save")
  }

  function cancel(){
      dispatch('cancel')
  }

</script>

<style>
  form {
      width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
  <form on:submit|preventDefault={submitForm} >
      <TextInput 
          id="title"
          label="Title"
          valid={titleValid}
          validityMessage="Please enter a valid title."
          value={title}
          on:input={e => (title = e.target.value)} />
      <TextInput 
          id="subtitle"
          label="Subtitle"
          valid={subTitleValid}
          validityMessage="Please enter a valid Subtitle."
          value={subtitle}
          on:input={event => (subtitle = event.target.value)} />
      <TextInput 
          id="address"
          label="Address"
          value={address}
          valid={addressValid}
          validityMessage="Please enter a valid address."
          on:input={event => (address = event.target.value)} />
      <TextInput 
          id="imageUrl"
          label="Image URL"
          value={imageUrl}
          on:input={event => (imageUrl = event.target.value)} />
      <TextInput 
          id="email"
          label="E-Mail"
          type="email"
          valid={emailValid}
          validityMessage="Please enter a valid email address."
          value={email}
          on:input={event => (email = event.target.value)} />
      <TextInput 
          id="description"
          label="Description"
          controlType="textarea"
          valid={descriptionValid}
          validityMessage="Please enter a valid description."
          bind:value={description} />
      </form>
      <div slot="footer">
          <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
          <Button type="button" on:click={submitForm} disabled={!formIsValid}>
            Save
          </Button>
          {#if meetupId}
            <Button type="button" on:click={deleteMeetup}>Delete</Button>
          {/if}
      </div>
</Modal>

