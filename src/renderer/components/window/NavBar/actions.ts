import { createLocalAction } from '../../../../shared/store/utils';

export const toggleNavBar1Expanded = createLocalAction('TOGGLE_NAVBAR_1')();
export const toggleNavBar2Expanded = createLocalAction('TOGGLE_NAVBAR_2')();

export const setNavBar1Expanded = createLocalAction('SET_NAVBAR_1_EXPANDED')<boolean>();
export const setNavBar2Expanded = createLocalAction('SET_NAVBAR_2_EXPANDED')<boolean>();
