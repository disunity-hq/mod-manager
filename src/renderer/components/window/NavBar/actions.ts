import { createStandardAction, createAction } from 'typesafe-actions';

export const toggleNavBar1Expanded = createStandardAction('TOGGLE_NAVBAR_1')();
export const toggleNavBar2Expanded = createStandardAction('TOGGLE_NAVBAR_2')();
export const toggleNavBar3Expanded = createStandardAction('TOGGLE_NAVBAR_3')();

export const setNavBar1Expanded = createStandardAction('SET_NAVBAR_1_EXPANDED')<boolean>();
export const setNavBar2Expanded = createStandardAction('SET_NAVBAR_2_EXPANDED')<boolean>();
export const setNavBar3Expanded = createStandardAction('SET_NAVBAR_3_EXPANDED')<boolean>();
