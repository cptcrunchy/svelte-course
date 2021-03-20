<script>
    import Modal from '../UI/Modal.svelte'
    export let message;
</script>

<Modal title="An error has occurred!">
    <p>{message}</p>
</Modal>