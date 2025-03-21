/// <reference types="vitest" />
import { render, screen, fireEvent } from '@testing-library/vue';
import InputTextAndLabel from '../../components/InputTextAndLabel.vue';
import { test, describe, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('InputTextAndLabel.vue', () => {
    test('renders label and placeholder correctly', () => {
        render(InputTextAndLabel, {
            props: {
                Label: 'Full Name',
                Placeholder: 'Enter your name',
                Value: '',
            },
        });

        expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
    });

    test('updates value when user types', async () => {
        const { emitted } = render(InputTextAndLabel, {
            props: {
                Label: 'Full Name',
                Placeholder: 'Enter your name',
                Value: '',
            },
        });

        const input = screen.getByPlaceholderText('Enter your name') as HTMLInputElement;

        // Simulate user typing 'John Doe'
        await fireEvent.update(input, 'John Doe');

        // Check if the emitted event contains the new value
        expect(emitted()['update:Value']).toBeTruthy();
        expect(emitted()['update:Value'][0]).toEqual(['John Doe']);
    });
});