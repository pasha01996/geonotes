<template>

    <div class="wrapper__notes_table">
        <slot name="notes-button"></slot>

        <ul class="list-group">
            <slot name="notes-items"></slot>
        </ul>
    </div>

</template>


<style lang="sass">
.wrapper__notes_table 
    display: flex
    flex-direction: column
    width: 33%
    
.list-group 
    height: 100%
    width: 100%
    background-color: #d1e7dd96
    padding: 30px 15px 20px
    row-gap: 20px
    border-radius: 0

@media (max-width: 700px)
    .wrapper__notes_table
        align-items: center
        flex-direction: row-reverse
        width: 100%
        height: 25%
    .list-group
        overflow: scroll
        padding: 15px 10px 10px
        row-gap: 10px
</style>