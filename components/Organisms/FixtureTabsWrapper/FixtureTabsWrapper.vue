<template>
    <div class="fixtureTabsWrapper" ref="matchDetail">
        <ul class="fixtureTabsWrapper__list">
            <li class="fixtureTabsWrapper__tab" v-for="tab in tabs" :key="tab" :class="{ selected: selectedTab == tab }" @click="slideTabs(tab)">{{ tab }}</li>
        </ul>
        <slot />
    </div>
</template>

<script setup>
import store from '@/store.js';
const selectedTab = ref('Overview');
const tabs = computed(() => store.getFixtureTabs());
const { query } = useRoute();
const matchDetail = ref('');
const state = reactive({
    initialX: null,
    initialY: null,
    currentX: 0,
    currentY: 0,
    diffX: 0,
    diffY: 0,
    isDragging: false,
    isStartTouch: false
});

store.setSelectedTab(selectedTab.value);

const slideTabs = (title) => {
    const tabsContainer = matchDetail.value.querySelector('.fixtureTabsWrapper__list');
    const tabsContainerWidth = tabsContainer.scrollWidth;
    const tabs = matchDetail.value.querySelectorAll('.fixtureTabsWrapper__tab');
    const selectedTabIndex = [...tabs].findIndex((element, index) => element.innerText.toLowerCase() == selectedTab.value.toLowerCase());

    selectedTab.value = title;
    store.setSelectedTab(title);
    slideTabsLogic(tabs, tabsContainer, tabsContainerWidth, selectedTabIndex);
};

const slideTabsLogic = (tabs, tabsContainer, tabsContainerWidth, selectedTabIndex) => {
    if (isFirstTwoTabs(selectedTabIndex)) {
        tabsContainer.style.transform = `translateX(0px)`;
        state.diffX = 0;
    } else if (isLastTab(selectedTabIndex, tabs)) {
        tabsContainer.style.transform = `translateX(${-tabsContainerWidth + 94 * (tabs.length - selectedTabIndex + 1)}px)`;
        state.diffX = parseInt(`${-tabsContainerWidth + 94 * (tabs.length - selectedTabIndex + 1)}`);
    } else {
        tabsContainer.style.transform = `translateX(${-(tabsContainerWidth - tabsContainer.clientWidth)}px)`;
        state.diffX = parseInt(tabsContainerWidth - tabsContainer.clientWidth);
    }
};

const isFirstTwoTabs = (selectedTabIndex) => selectedTabIndex == 0 || selectedTabIndex == 1;
const isLastTab = (selectedTabIndex, tabs) => selectedTabIndex == tabs.length;

const userNotStartedDrag = () => state.initialX === null || state.initialY === null || !state.isStartTouch;
const userSlideYCoordinate = () => Math.abs(state.diffX) < Math.abs(state.diffY);
const userSlideToRight = () => state.diffX > 0;

const setSliderValues = (event) => {
    state.isDragging = true;
    state.currentX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    state.currentY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    state.diffX = state.initialX - state.currentX;
    state.diffY = state.initialY - state.currentY;
};

const startTouch = (event) => {
    const isTargetTabs = (event) => event.target.closest('.fixtureTabsWrapper__list');
    if (!isTargetTabs(event)) return;
    state.initialX = event instanceof MouseEvent ? (state.diffX += event.clientX) : (state.diffX += event.touches[0].clientX);
    state.initialY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;
    state.isStartTouch = true;
};
const moveTouch = (event) => {
    const tabsList = matchDetail.value.querySelector('.fixtureTabsWrapper__list');
    if (userNotStartedDrag()) return;
    setSliderValues(event);
    translateTabsOnSwipe(tabsList);
};

const translateTabsOnSwipe = (tabs) => {
    if (userSlideYCoordinate()) return;

    tabs.style.transition = 'none';
    if (state.diffX > tabs.scrollWidth - tabs.clientWidth) {
        tabs.style.transform = `translate3d(${-(tabs.scrollWidth - tabs.clientWidth)}px, 0, 0) `;
        state.diffX = tabs.scrollWidth - tabs.clientWidth;
        return;
    }

    if (state.diffX < 0) {
        tabs.style.transform = `translate3d(0px, 0, 0) `;
        state.diffX = 0;
        return;
    }
    userSlideToRight() ? (tabs.style.transform = `translate3d(-${state.diffX}px, 0, 0) `) : (tabs.style.transform = `translate3d(${-state.diffX}px, 0, 0) `);
    return;
};

const touchEnd = (event) => {
    const tabsList = matchDetail.value.querySelector('.fixtureTabsWrapper__list');
    state.isStartTouch = false;
    if (!state.isDragging) return;
    if (userSlideYCoordinate()) return;
    tabsList.style.transition = 'transform 0.3s ease';

    // userSlideToRight() ? (tabsList.style.transform = `translate3d(-${state.diffX}px, 0, 0) `) : (tabsList.style.transform = `translate3d(${-state.diffX}px, 0, 0) `);

    state.isDragging = false;
};

onMounted(() => {
    const body = document.querySelector('body');
    body.addEventListener('touchstart', startTouch, { passive: false });
    body.addEventListener('mousedown', startTouch, { passive: false });

    body.addEventListener('touchmove', moveTouch, { passive: false });
    body.addEventListener('mousemove', moveTouch, { passive: false });

    body.addEventListener('mouseup', touchEnd, { passive: false });
    body.addEventListener('touchend', touchEnd, { passive: false });
});

onBeforeUnmount(() => {
    const body = document.querySelector('body');
    body.removeEventListener('touchstart', startTouch, { passive: false });
    body.removeEventListener('mousedown', startTouch, { passive: false });

    body.removeEventListener('touchmove', moveTouch, { passive: false });
    body.removeEventListener('mousemove', moveTouch, { passive: false });

    body.removeEventListener('mouseup', touchEnd, { passive: false });
    body.removeEventListener('touchend', touchEnd, { passive: false });
});
</script>

<style lang="scss" scoped>
.fixtureTabsWrapper {
    overflow: hidden;
    &__list {
        display: grid;
        grid-template-columns: repeat(6, 94px);
        transition: transform 0.3s ease;
    }

    &__tab {
        padding: 12px 0;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        text-transform: uppercase;
        cursor: pointer;

        &.selected {
            border-bottom: 1px solid var(--color-primary);
            color: var(--color-primary);
        }
    }
}
</style>
