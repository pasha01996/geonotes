<template>
    <div
        class="dialog"
        @click="closeModal"
    >
        <div
            class="dialog__content"
            @click.stop
            >
            <slot name="content"></slot>
            <div
                class="dialog__button-close"
            >
                <slot name="button">
                    <button
                        v-if="!$slots.button"
                        @click="closeModal"
                        class="btn btn-secondary button__close"
                        type="button"
                    >
                        &times
                    </button>
                </slot>
            </div>

        </div>

    </div>
</template>


<script setup lang="ts">
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  }
})

const emits = defineEmits(['closeModal'])
function closeModal() {
    emits('closeModal')
}

</script>


<style lang="sass">
.dialog
    top: 0
    bottom: 0
    right: 0
    left: 0
    background-color: rgba(0, 0, 0, 0.5)
    position: fixed
    display: flex

.dialog__content
    position: relative
    display: flex
    justify-content: space-between
    flex-direction: column
    row-gap: 20px
    margin: auto
    background-color: rgb(244, 247, 249)
    border-radius: 10px
    padding: 20px


.dialog__button-close
    position: absolute
    top: 5px
    right: 5px

.button__close
    display: flex
    justify-content: center
    align-items: center
    font-size: 14px
    line-height: 0
    border-radius: 50%
    padding: 0px
    width: 20px
    height: 20px
</style>
