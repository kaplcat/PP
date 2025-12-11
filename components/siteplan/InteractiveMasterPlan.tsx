import React, { useState, useEffect, useRef } from 'react';
import Papa from 'papaparse';
import { Section } from '../ui/Section';
import { MapSVG } from './MapSVG';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTzteeV0ZFjulZUYhirS562BZIN64gNS3VXlkuKtLOAB3nyz0KosLU_t70fwr1u3YnCz2rlWeoQg8aV/pub?gid=1245862649&single=true&output=csv";

// Color mapping based on status
const statusColors: any = {
    "в продаже": { base: 'rgba(200, 230, 201, 0.5)', hover: 'rgba(165, 214, 167, 0.8)', text: 'rgba(56, 142, 60, 1)' },
    "забронирован": { base: 'rgba(255, 211, 165, 0.5)', hover: 'rgba(255, 179, 71, 0.8)', text: 'rgba(139, 69, 19, 1)' },
    "продан": { base: 'rgba(255, 179, 186, 0.5)', hover: 'rgba(255, 154, 162, 0.8)', text: 'rgba(139, 38, 53, 1)' },
    "специальное предложение": { base: 'rgba(179, 157, 219, 0.5)', hover: 'rgba(149, 117, 205, 0.8)', text: 'rgba(74, 20, 140, 1)' },
    "общественная зона": { base: 'rgba(159, 197, 232, 0.5)', hover: 'rgba(111, 168, 220, 0.8)', text: 'rgba(28, 69, 135, 1)' },
    "лесной участок": { base: 'rgba(178, 223, 219, 0.5)', hover: 'rgba(128, 203, 196, 0.8)', text: 'rgba(0, 77, 64, 1)' },
    "проект": { base: 'rgba(255, 243, 205, 0.5)', hover: 'rgba(255, 236, 179, 0.8)', text: 'rgba(184, 134, 11, 1)' },
    "строится": { base: 'rgba(175, 183, 186, 0.5)', hover: 'rgba(176, 190, 197, 0.8)', text: 'rgba(38, 50, 56, 1)' },
};

const lotStatuses = [
    { label: "В продаже", color: "#C8E6C9" },
    { label: "Забронирован", color: "#FFD3A5" },
    { label: "Спецпредложение", color: "#B39DDB" },
    { label: "Продан", color: "#FFB3BA" },
    { label: "Лесной участок", color: "#B2DFDB" },
    { label: "Проект", color: "#FFF3CD" },
    { label: "Строится", color: "#CFD8DC" },
];

const infraLegendItems = [
    {
        label: "Отдел продаж, администрация",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill="rgb(39, 56, 71)" d="M10 0C15.5228 0 20 4.4772 20 10C20 15.5228 15.5228 20 10 20C4.4772 20 0 15.5228 0 10C0 4.4772 4.4772 0 10 0Z" />
                <path fill="rgb(255, 255, 255)" fillRule="evenodd" clipRule="evenodd" d="M16.9873 8.9873C16.2611 8.2611 15.535 7.535 14.8089 6.8089C14.8089 5.983 14.8089 5.1571 14.8089 4.3312C14.8089 4.1146 14.7197 3.9045 14.5669 3.7516C14.414 3.5987 14.2038 3.5096 13.9873 3.5096C13.7707 3.5096 13.5605 3.5924 13.4076 3.7516C13.2548 3.9045 13.1656 4.1146 13.1656 4.3312C13.1656 4.6072 13.1656 4.8832 13.1656 5.1592C12.6327 4.6327 12.0998 4.1062 11.5669 3.5796C11.1656 3.2038 10.6306 2.9936 10.0828 2.9936C9.5287 2.9936 9 3.2038 8.5987 3.5796C6.7856 5.3928 4.9724 7.2059 3.1592 9.0191C3.0064 9.172 2.9236 9.3822 2.9236 9.5987C2.9236 9.8153 3.0064 10.0255 3.1592 10.1783C3.2357 10.2548 3.3248 10.3185 3.4204 10.3567C3.5223 10.4013 3.6242 10.4204 3.7325 10.4204C3.8408 10.4204 3.949 10.4013 4.0446 10.3567C4.1465 10.3121 4.2357 10.2548 4.3057 10.1783C6.1189 8.3652 7.9321 6.552 9.7452 4.7389C9.8344 4.6561 9.9554 4.6115 10.0764 4.6115C10.1975 4.6115 10.3185 4.6561 10.4076 4.7389C12.2208 6.552 14.034 8.3652 15.8471 10.1783C16 10.3312 16.2102 10.414 16.4268 10.414C16.6433 10.414 16.8535 10.3312 17.0064 10.1783C17.0828 10.1019 17.1465 10.0064 17.1911 9.9045C17.2357 9.8025 17.2548 9.6879 17.2484 9.5796C17.2484 9.4713 17.2166 9.3567 17.172 9.2611C17.1274 9.1656 17.0701 9.0637 16.9873 8.9873Z"/>
                <path fill="rgb(255, 255, 255)" fillRule="evenodd" clipRule="evenodd" d="M10.3822 6.242C10.3439 6.2038 10.2994 6.172 10.2484 6.1529C10.1975 6.1338 10.1465 6.121 10.0892 6.121C10.0382 6.121 9.9809 6.1338 9.9299 6.1529C9.879 6.172 9.8344 6.2038 9.7962 6.242C8.2144 7.8408 6.6327 9.4395 5.051 11.0382C5.0127 11.0764 4.9809 11.121 4.9618 11.1656C4.9427 11.2166 4.9299 11.2675 4.9299 11.3185C4.9299 12.4756 4.9299 13.6327 4.9299 14.7898C4.9299 15.1783 5.0828 15.5541 5.3631 15.828C5.6369 16.1019 6.0127 16.2611 6.4013 16.2611C7.1847 16.2611 7.9682 16.2611 8.7516 16.2611C8.7516 15.0467 8.7516 13.8323 8.7516 12.6178C9.6412 12.6178 10.5308 12.6178 11.4204 12.6178C11.4204 13.8323 11.4204 15.0467 11.4204 16.2611C12.2038 16.2611 12.9873 16.2611 13.7707 16.2611C14.1592 16.2611 14.535 16.1083 14.8089 15.828C15.0828 15.5541 15.242 15.1783 15.242 14.7898C15.242 13.6327 15.242 12.4756 15.242 11.3185C15.242 11.2675 15.2357 11.2166 15.2166 11.1656C15.1975 11.1146 15.172 11.0701 15.1338 11.0382C13.5499 9.4395 11.966 7.8408 10.3822 6.242Z"/>
            </svg>
        )
    },
    {
        label: "Въезд в посёлок, КПП",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill="rgb(39, 56, 71)" d="M10 0C15.5228 0 20 4.4772 20 10C20 15.5228 15.5228 20 10 20C4.4772 20 0 15.5228 0 10C0 4.4772 4.4772 0 10 0Z" />
                <path fill="rgb(255, 255, 255)" fillRule="evenodd" clipRule="evenodd" d="M10.2038 3.7389C10.2781 3.7389 10.3524 3.7389 10.4268 3.7389C11.2803 3.828 12.0892 4.1592 12.758 4.6943C13.4268 5.2293 13.9236 5.949 14.1975 6.7643C14.3503 7.2229 14.4204 7.7006 14.4076 8.1847C14.3885 8.5796 14.3057 8.9745 14.1656 9.3439C13.8662 10.2102 13.4586 11.0318 12.9682 11.8025C12.2293 12.9894 11.4904 14.1762 10.7516 15.3631C10.448 15.8471 10.1444 16.3312 9.8408 16.8153C9.8408 16.8344 9.8408 16.8535 9.8408 16.879C9.7473 16.7113 9.6539 16.5435 9.5605 16.3758C9.0467 15.5244 8.5329 14.673 8.0191 13.8217C7.5987 13.1146 7.172 12.4076 6.7707 11.6943C6.5414 11.2803 6.3885 10.8981 6.2038 10.5159C6.0127 10.0955 5.8471 9.6561 5.707 9.2166C5.6051 8.8917 5.5414 8.5478 5.5287 8.2102C5.5287 7.9873 5.5478 7.7643 5.5796 7.5478C5.6242 7.1465 5.7325 6.7516 5.9045 6.3885C6.1338 5.8344 6.4777 5.3312 6.9108 4.9172C7.3885 4.4968 7.949 4.1783 8.5541 3.9873C8.879 3.8662 9.2166 3.7834 9.5605 3.7452C9.6348 3.7452 9.7091 3.7452 9.7834 3.7452C9.9236 3.7452 10.0637 3.7452 10.2038 3.7452C10.2038 3.7431 10.2038 3.741 10.2038 3.7389M9.9554 5.5032C9.4586 5.5032 8.9682 5.6497 8.5541 5.9236C8.1401 6.1975 7.8153 6.5924 7.6178 7.051C7.4204 7.5096 7.3694 8.0191 7.4586 8.5096C7.5478 9 7.7834 9.4522 8.1338 9.8089C8.4841 10.1656 8.9236 10.414 9.414 10.5223C9.9045 10.6306 10.4076 10.5924 10.8726 10.4076C11.3376 10.2229 11.7389 9.9172 12.0318 9.5096C12.3185 9.1019 12.4841 8.6178 12.4968 8.121C12.5096 7.7834 12.4522 7.4395 12.3248 7.121C12.2038 6.8025 12.0191 6.5159 11.7771 6.2675C11.5414 6.0255 11.2548 5.828 10.9427 5.6943C10.6306 5.5732 10.293 5.5032 9.9554 5.5032Z"/>
            </svg>
        )
    },
    {
        label: "Технический, пожарный въезд",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill="rgb(39, 56, 71)" d="M10 0C15.5228 0 20 4.4772 20 10C20 15.5228 15.5228 20 10 20C4.4772 20 0 15.5228 0 10C0 4.4772 4.4772 0 10 0Z" />
                <path fill="rgb(255, 255, 255)" fillRule="evenodd" clipRule="evenodd" d="M14.6943 15.7962C13.8301 15.7962 12.966 15.7962 12.1019 15.7962C12.1019 12.8259 12.1019 9.8556 12.1019 6.8854C10.7813 6.8854 9.4607 6.8854 8.1401 6.8854C8.1401 9.8556 8.1401 12.8259 8.1401 15.7962C7.2739 15.7962 6.4076 15.7962 5.5414 15.7962C5.5414 12.017 5.5414 8.2378 5.5414 4.4586C8.5924 4.4586 11.6433 4.4586 14.6943 4.4586C14.6943 8.2378 14.6943 12.017 14.6943 15.7962Z"/>
            </svg>
        )
    },
    {
        label: "Вход в лесную зону",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill="rgb(39, 56, 71)" d="M10 0C15.5228 0 20 4.4772 20 10C20 15.5228 15.5228 20 10 20C4.4772 20 0 15.5228 0 10C0 4.4772 4.4772 0 10 0Z" />
                <path fill="rgb(255, 255, 255)" fillRule="evenodd" clipRule="evenodd" d="M13.7834 16.2166C13.4777 15.2166 13.172 14.2166 12.8662 13.2166C12.8662 13.2166 15.6178 9.6178 12.0764 7.8471C9.758 6.6752 7.2357 5.1338 6.5287 3.758C6.2803 6.3185 6.3312 8.8981 6.6752 11.4459C6.9936 12.758 8.6815 15.7834 11.3885 13.9618C11.5796 13.8089 11.4904 13.9618 11.4904 13.9618C11.4904 13.9618 11.8217 13.6879 11.4904 12.4777C10.9554 10.8917 7.9873 8.5987 7.1975 5.5987C8.4395 7.5605 9.7898 9.4522 11.2548 11.2611C12.1338 12.9682 12.8408 14.7643 13.3631 16.6115C13.5032 16.4798 13.6433 16.3482 13.7834 16.2166Z"/>
            </svg>
        )
    },
    {
        label: "Сквер",
        icon: (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill="rgb(39, 56, 71)" d="M10 0C15.5228 0 20 4.4772 20 10C20 15.5228 15.5228 20 10 20C4.4772 20 0 15.5228 0 10C0 4.4772 4.4772 0 10 0Z" />
                <path fill="rgb(255, 255, 255)" fillRule="evenodd" clipRule="evenodd" d="M3.0573 15.3758C3.242 15.2484 3.4586 15.1783 3.6815 15.172C4.051 15.1338 4.4204 15.0955 4.7898 15.0573C4.8599 15.0573 4.9299 15.0573 5 15.0573C5.051 15.0573 5.0955 15.0382 5.1338 15.0127C5.172 14.9809 5.2038 14.9427 5.2166 14.8981C5.3439 14.5032 5.4968 14.1338 5.5987 13.7389C5.828 12.8025 5.9172 11.828 5.8471 10.8662C5.8217 10.3503 5.758 9.8344 5.6561 9.3248C5.6561 9.3057 5.6561 9.2803 5.6561 9.2548C5.5287 9.3036 5.4013 9.3524 5.2739 9.4013C5.0255 9.4968 4.758 9.5223 4.4968 9.465C4.2357 9.4076 4 9.2739 3.8153 9.0828C3.6178 8.9108 3.4713 8.6815 3.4076 8.4204C3.3376 8.1656 3.3503 7.8917 3.4331 7.6433C3.4522 7.586 3.4586 7.5223 3.4522 7.465C3.4395 7.4013 3.414 7.3503 3.3758 7.2994C3.1783 7.0318 3.0828 6.7006 3.1146 6.3631C3.1401 6.0318 3.293 5.7197 3.5287 5.4841C3.5732 5.4395 3.6115 5.3885 3.6306 5.3248C3.6561 5.2675 3.6624 5.2038 3.6624 5.1401C3.6497 4.8408 3.7389 4.5541 3.9172 4.3121C4.0892 4.0701 4.3376 3.8917 4.6242 3.8089C4.8025 3.7643 4.9809 3.7452 5.1592 3.7389C5.2102 3.7452 5.2675 3.7325 5.3185 3.7134C5.3694 3.6943 5.414 3.6624 5.4459 3.6242C5.6688 3.3567 5.9745 3.1847 6.3185 3.1274C6.5223 3.0955 6.7325 3.1146 6.9236 3.1783C7.1146 3.242 7.2994 3.3503 7.4459 3.4904C7.4968 3.5223 7.5478 3.5414 7.6115 3.5414C7.6688 3.5414 7.7261 3.5223 7.7771 3.4904C8.0701 3.3822 8.3885 3.3694 8.6879 3.465C8.9873 3.5605 9.242 3.7516 9.4204 4.0064C9.6242 4.2803 9.7197 4.6242 9.6879 4.9618C9.6815 5.0127 9.6879 5.0701 9.7134 5.1146C9.7389 5.1592 9.7707 5.2038 9.8153 5.2357C10.1146 5.4713 10.3121 5.8153 10.3631 6.1911C10.3822 6.4076 10.3503 6.6242 10.2739 6.8217C10.1975 7.0255 10.0701 7.2038 9.9108 7.3503C9.8726 7.414 9.8217 7.4777 9.7643 7.535C9.7197 7.5605 9.6879 7.5987 9.6752 7.6433C9.6561 7.6879 9.6561 7.7389 9.6688 7.7834C9.707 8.0318 9.6752 8.2866 9.5732 8.5159C9.4777 8.7452 9.3185 8.949 9.1146 9.0955C8.9108 9.242 8.6752 9.3312 8.4204 9.3567C8.172 9.3758 7.9172 9.3312 7.6943 9.2229C7.6178 9.1847 7.5414 9.1465 7.465 9.1083C7.4459 9.189 7.4268 9.2696 7.4076 9.3503C7.2166 10.3185 7.1656 11.3057 7.242 12.293C7.3121 13.121 7.4841 13.9299 7.7516 14.7134C7.8089 14.8662 7.8599 14.9045 8.0318 14.9045C8.2272 14.9045 8.4225 14.9045 8.6178 14.9045C8.6178 15.1274 8.6178 15.3503 8.6178 15.5732C8.845 15.5732 9.0722 15.5732 9.2994 15.5732C9.2994 15.4777 9.2994 15.3822 9.2994 15.2866C9.2994 15.2293 9.2994 15.1975 9.3758 15.2102C9.5775 15.2102 9.7792 15.2102 9.9809 15.2102C9.9809 15.1019 9.9809 14.9873 9.9809 14.8726C10.2272 14.8726 10.4735 14.8726 10.7197 14.8726C11.2845 14.8726 11.8493 14.8726 12.414 14.8726C13.0977 14.8726 13.7813 14.8726 14.465 14.8726C14.5159 14.8726 14.535 14.8726 14.535 14.9427C14.5287 15.0255 14.5287 15.1019 14.535 15.1847C14.7431 15.1847 14.9512 15.1847 15.1592 15.1847C15.1592 15.0955 15.1592 14.9936 15.1592 14.9045C15.1592 15.1274 15.1592 15.3503 15.1592 15.5732C15.3673 15.5732 15.5754 15.5732 15.7834 15.5732C15.7834 15.4204 15.7834 15.2675 15.7834 15.0955C15.879 15.0955 15.9745 15.0955 16.0701 15.0955C16.3949 15.121 16.7134 15.1783 17.0255 15.2675C17.051 15.2611 17.0828 15.2611 17.1146 15.2675C17.1146 15.2675 17.1656 15.2675 17.1656 15.3248C17.1656 15.3822 17.1656 15.3248 17.1146 15.3758C16.9427 15.4522 16.758 15.4968 16.5669 15.5032C16.1529 15.5541 15.7452 15.6178 15.3312 15.6497C14.7261 15.6497 14.1338 15.707 13.5414 15.7261C12.586 15.7261 11.5478 15.7834 10.5605 15.7962C9.7962 15.7962 9.0191 15.7962 8.2611 15.7962C7.5032 15.7962 6.7197 15.7962 5.9554 15.7261C5.1911 15.6561 4.5096 15.6306 3.7325 15.5796C3.5669 15.5541 3.4013 15.5223 3.2357 15.4713C3.1656 15.4586 3.1083 15.4204 3.0573 15.3758Z"/>
                <path fill="rgb(255, 255, 255)" fillRule="evenodd" clipRule="evenodd" d="M15.7771 13.7452C15.7771 14.2909 15.7771 14.8365 15.7771 15.3822C15.7771 15.4968 15.7771 15.4968 15.6688 15.4968C15.6136 15.4968 15.5584 15.4968 15.5032 15.4968C15.3885 15.4968 15.3567 15.4968 15.3567 15.3503C15.3567 14.9299 15.3567 14.5096 15.3567 14.0892C15.3567 13.9809 15.3567 13.8726 15.3567 13.7643C15.276 13.7643 15.1953 13.7643 15.1146 13.7643C15.1146 14.1507 15.1146 14.5372 15.1146 14.9236C15.1146 15.172 15.1146 15.172 14.8535 15.1656C14.5924 15.1592 14.6688 15.1656 14.6624 14.9427C14.6624 14.5478 14.6624 14.1529 14.6624 13.758C13.0658 13.758 11.4692 13.758 9.8726 13.758C9.8726 13.7898 9.8726 13.8217 9.8726 13.8535C9.8726 14.2548 9.8726 14.6561 9.8726 15.0573C9.8726 15.1338 9.8726 15.1656 9.7771 15.172C9.7006 15.172 9.6242 15.172 9.5478 15.172C9.4586 15.172 9.4204 15.172 9.414 15.0446C9.4013 14.9172 9.414 14.8408 9.414 14.7452C9.414 14.4161 9.414 14.087 9.414 13.758C9.3397 13.758 9.2654 13.758 9.1911 13.758C9.1911 13.7834 9.1911 13.8089 9.1911 13.8344C9.1911 14.3439 9.1911 14.8599 9.1911 15.3694C9.1911 15.4968 9.1911 15.5414 9.0191 15.5541C8.7898 15.5924 8.7898 15.5924 8.7898 15.2866C8.7898 14.7749 8.7898 14.2633 8.7898 13.7516C8.7049 13.7516 8.62 13.7516 8.535 13.7516C8.5223 13.6242 8.5478 13.4904 8.6115 13.3758C8.758 13.172 8.8917 12.9809 9.0446 12.7898C9.0637 12.7834 9.0764 12.7771 9.0955 12.7771C9.1146 12.7771 9.1338 12.7834 9.1465 12.7898C11.2994 12.7898 13.4522 12.7898 15.6051 12.7898C15.6752 12.7898 15.7197 12.7898 15.7516 12.8662C15.8599 13.0955 15.9745 13.3248 16.0764 13.5669C16.0828 13.6433 16.0828 13.7134 16.0764 13.7898C15.9766 13.7749 15.8769 13.7601 15.7771 13.7452Z"/>
                <path fill="rgb(255, 255, 255)" d="M15.6815 11.0764C13.4841 11.0764 11.2866 11.0764 9.0892 11.0764C9.0892 11.2081 9.0892 11.3397 9.0892 11.4713C11.2866 11.4713 13.4841 11.4713 15.6815 11.4713C15.6815 11.3397 15.6815 11.2081 15.6815 11.0764Z"/>
                <path fill="rgb(255, 255, 255)" d="M15.6879 12.2038C13.4862 12.2038 11.2845 12.2038 9.0828 12.2038C9.0828 12.3291 9.0828 12.4544 9.0828 12.5796C11.2866 12.5796 13.4904 12.5796 15.6943 12.5796C15.6943 12.4544 15.6943 12.3291 15.6943 12.2038C15.6921 12.2038 15.69 12.2038 15.6879 12.2038"/>
                <path fill="rgb(255, 255, 255)" d="M15.6879 11.6688C13.4862 11.6688 11.2845 11.6688 9.0828 11.6688C9.0828 11.7771 9.0828 11.8854 9.0828 11.9936C11.2866 11.9936 13.4904 11.9936 15.6943 11.9936C15.6943 11.8854 15.6943 11.7771 15.6943 11.6688C15.6921 11.6688 15.69 11.6688 15.6879 11.6688"/>
            </svg>
        )
    },
];

export const InteractiveMasterPlan: React.FC = () => {
    const [lots, setLots] = useState<any[]>([]);
    const [hoveredLot, setHoveredLot] = useState<any>(null);
    const [filterType, setFilterType] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [isLegendOpen, setIsLegendOpen] = useState(false);
    const mapRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    // Fetch and Parse CSV
    useEffect(() => {
        fetch(SHEET_URL)
            .then(res => res.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results: any) => {
                        const parsedData = results.data.map((row: any) => ({
                            id: row["id"]?.trim() || row["ID"]?.trim() || "",
                            title: (row["title"] || row["Название"] || "").trim(),
                            status: (row["status"] || row["Статус"] || "").trim().toLowerCase(),
                            price: (row["price"] || row["Цена"] || "").trim(),
                            image: (row["image"] || row["Фото"] || "").trim(),
                            housearea: (row["housearea"] || row["Площадь дома"] || "").trim(),
                            landarea: (row["landarea"] || row["Площадь участка"] || "").trim(),
                            link: (row["link"] || row["Ссылка"] || "").trim(),
                            description: (row["description"] || row["Описание"] || "").trim(),
                            areanumber: (row["area number"] || row["Номер участка"] || "").trim()
                        })).filter((item: any) => item.id);
                        setLots(parsedData);
                    }
                });
            });
    }, []);

    // Handle Map Styling based on Filters and Data
    useEffect(() => {
        if (!mapRef.current || lots.length === 0) return;

        lots.forEach(lot => {
            const element = mapRef.current?.querySelector(`#${lot.id}`) as SVGElement | null;
            if (element) {
                const colors = statusColors[lot.status] || { base: 'rgba(204,204,204,0.1)', hover: 'rgba(221,221,221,0.5)' };
                
                // Check Filters
                const matchesType = !filterType || lot.title === filterType;
                const matchesStatus = !filterStatus || lot.status === filterStatus.toLowerCase();
                
                const isVisible = matchesType && matchesStatus;

                element.style.display = isVisible ? 'block' : 'none';
                element.style.fill = colors.base;
                element.style.cursor = 'default';

                // Event Listeners for coloring and tooltip
                element.onmouseenter = (e: MouseEvent) => { 
                    element.style.fill = colors.hover;
                    setHoveredLot(lot);
                    if (tooltipRef.current) {
                        tooltipRef.current.style.opacity = '1';
                        tooltipRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY - 20}px) translate(-50%, -100%)`;
                    }
                };
                element.onmousemove = (e: MouseEvent) => {
                    if (tooltipRef.current) {
                        tooltipRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY - 20}px) translate(-50%, -100%)`;
                    }
                };
                element.onmouseleave = () => { 
                    element.style.fill = colors.base; 
                    setHoveredLot(null);
                    if (tooltipRef.current) {
                        tooltipRef.current.style.opacity = '0';
                    }
                };
                
                // Remove Click Handler if it exists from previous renders
                element.onclick = null;
            }
        });
    }, [lots, filterType, filterStatus]);

    return (
        <Section id="interactive-map" className="bg-light relative">
            
            {/* Filters & Legend Header */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 mb-12">
                <div>
                    <span className="text-accent text-xs font-bold uppercase tracking-[0.25em]">Интерактив</span>
                    <h2 className="font-serif text-3xl md:text-5xl text-primary mt-4">План посёлка</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full xl:w-auto">
                    {/* Filter Type */}
                    <div className="relative w-full md:w-56">
                        <select 
                            className="w-full appearance-none bg-white border border-gray-200 px-6 py-4 rounded-full text-sm uppercase tracking-wider focus:outline-none focus:border-accent cursor-pointer"
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="">Все объекты</option>
                            <option value="Коттедж «Антарес»">Коттедж «Антарес»</option>
                            <option value="Коттедж «Адара»">Коттедж «Адара»</option>
                            <option value="Коттедж «Сириус»">Коттедж «Сириус»</option>
                            <option value="Коттедж «Алиот»">Коттедж «Алиот»</option>
                            <option value="Коттедж «Вега»">Коттедж «Вега»</option>
                            <option value="Коттедж «Мицар»">Коттедж «Мицар»</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                           <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1L5 5L9 1"/></svg>
                        </div>
                    </div>

                    {/* Filter Status */}
                    <div className="relative w-full md:w-56">
                        <select 
                            className="w-full appearance-none bg-white border border-gray-200 px-6 py-4 rounded-full text-sm uppercase tracking-wider focus:outline-none focus:border-accent cursor-pointer"
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="">Все статусы</option>
                            <option value="в продаже">В продаже</option>
                            <option value="забронирован">Забронирован</option>
                            <option value="специальное предложение">Спецпредложение</option>
                            <option value="продан">Продан</option>
                            <option value="лесной участок">Лесной участок</option>
                            <option value="проект">Проект</option>
                            <option value="строится">Строится</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                           <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1L5 5L9 1"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Legend Bar - Collapsible */}
            <div className="mb-8 bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
                <button 
                    onClick={() => setIsLegendOpen(!isLegendOpen)}
                    className="w-full flex justify-between items-center p-6 md:px-8 bg-white hover:bg-gray-50 transition-colors group"
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full bg-accent transition-transform duration-500 ${isLegendOpen ? 'scale-100' : 'scale-75 opacity-50'}`} />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Легенда и обозначения</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest group-hover:text-accent transition-colors">
                        <span>{isLegendOpen ? 'Свернуть' : 'Показать'}</span>
                        <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-500 ${isLegendOpen ? 'rotate-180' : ''}`} 
                        />
                    </div>
                </button>

                <div 
                    className={`transition-all duration-700 ease-in-out overflow-hidden ${
                        isLegendOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="px-8 pb-8 pt-2 flex flex-col xl:flex-row gap-8 border-t border-gray-100/50">
                        {/* Statuses */}
                        <div className="xl:w-1/3 pt-6">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Статусы участков</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {lotStatuses.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                        <span className="text-[10px] uppercase tracking-widest text-gray-500">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden xl:block w-px bg-gray-100 my-6"></div>

                        {/* Infrastructure */}
                        <div className="flex-1 pt-6">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Инфраструктура</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                                {infraLegendItems.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className="w-5 h-5 shrink-0 text-primary/80">
                                            {item.icon}
                                        </div>
                                        <span className="text-[10px] uppercase tracking-wider text-gray-500 leading-5 pt-[2px]">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Wrapper */}
            <div 
                ref={mapRef} 
                className="relative w-full bg-[#E5E7EB] rounded-2xl overflow-x-auto overflow-y-hidden shadow-inner group border border-gray-200"
                style={{ backgroundImage: "url('https://static.tildacdn.com/tild6462-3065-4830-b637-653564383861/___.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {/* The SVG Component */}
                <div className="min-w-[1000px] xl:min-w-full">
                    <MapSVG />
                </div>
            </div>

            {/* Tooltip Portal - Rendered outside to be on top of everything including map overflow */}
            {createPortal(
                <div 
                    ref={tooltipRef}
                    className="fixed top-0 left-0 z-[60] bg-white shadow-2xl pointer-events-none border border-gray-100 w-[280px] opacity-0 transition-opacity duration-200 rounded-sm overflow-hidden"
                    style={{ willChange: 'transform' }}
                >
                    {hoveredLot && (
                        <>
                            {/* Image Thumbnail */}
                            {hoveredLot.image && (
                                <div className="h-32 w-full bg-gray-100 relative">
                                    <img 
                                        src={hoveredLot.image} 
                                        alt={hoveredLot.title}
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            )}

                            <div className="p-5">
                                {/* Area Number */}
                                {hoveredLot.areanumber && (
                                     <span className="text-[10px] text-accent font-bold uppercase tracking-[0.2em] mb-2 block">
                                        Участок {hoveredLot.areanumber}
                                    </span>
                                )}

                                <div className="flex justify-between items-start mb-3 gap-2">
                                    <span className="font-serif text-lg text-primary leading-tight">{hoveredLot.title}</span>
                                    <span 
                                        className="text-[8px] uppercase font-bold tracking-wider px-2 py-1 rounded-sm whitespace-nowrap shrink-0"
                                        style={{ 
                                            backgroundColor: statusColors[hoveredLot.status]?.base || '#eee',
                                            color: statusColors[hoveredLot.status]?.text || '#666'
                                        }}
                                    >
                                        {hoveredLot.status}
                                    </span>
                                </div>
                                
                                <div className="space-y-1">
                                    {hoveredLot.housearea && (
                                        <div className="flex justify-between text-xs items-center gap-4">
                                            <span className="text-gray-400">Дом</span>
                                            <span className="text-primary font-medium">{hoveredLot.housearea}</span>
                                        </div>
                                    )}
                                    {hoveredLot.landarea && (
                                        <div className="flex justify-between text-xs items-center gap-4">
                                            <span className="text-gray-400">Участок</span>
                                            <span className="text-primary font-medium">{hoveredLot.landarea}</span>
                                        </div>
                                    )}
                                    {hoveredLot.price && (
                                        <div className="flex justify-between text-xs mt-2 pt-2 border-t border-gray-50 items-center gap-4">
                                            <span className="text-gray-400">Цена</span>
                                            <span className="text-primary font-bold">{hoveredLot.price}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>,
                document.body
            )}

        </Section>
    );
};