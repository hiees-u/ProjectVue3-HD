/// <reference types="vitest" />
import { render, screen, fireEvent, waitFor } from '@testing-library/vue';
import BaseTooltip from '../../components/BaseTooltip.vue';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { nextTick } from 'vue';

describe('TooltipComponent.vue', () => {
    test('does not show tooltip by default', () => {
        render(BaseTooltip, {
            props: { text: 'Tooltip message' },
            slots: { default: '<button>Hover me</button>' },
        });

        // Tooltip should not be in the DOM initially
        expect(screen.queryByText('Tooltip message')).not.toBeVisible();
    });

    test('shows tooltip on hover', async () => {
        render(BaseTooltip, {
            props: { text: 'Tooltip message' },
            slots: { default: '<button>Hover me</button>' },
        });

        const button = screen.getByText('Hover me');
        await fireEvent.mouseEnter(button);

        expect(screen.getByText('Tooltip message')).toBeInTheDocument();
    });

    test('hides tooltip when mouse leaves', async () => {
        render(BaseTooltip, {
            props: { text: 'Tooltip message' },
            slots: { default: '<button>Hover me</button>' },
        });

        const button = screen.getByText('Hover me');
        await fireEvent.mouseEnter(button);
        expect(screen.getByText('Tooltip message')).toBeInTheDocument();

        await fireEvent.mouseLeave(button);
        expect(screen.queryByText('Tooltip message')).not.toBeVisible();
    });

    test('applies correct position class', async () => {
        render(BaseTooltip, {
            props: {
                text: 'Tooltip message',
                position: 'bottom',
            },
            slots: {
                default: '<button>Hover me</button>',
            },
        });

        const button = screen.getByText('Hover me');
        await fireEvent.mouseEnter(button);

        // Chờ Vue cập nhật DOM
        await nextTick();

        // Dùng waitFor để đảm bảo tooltip xuất hiện
        const tooltip = await waitFor(() => screen.getByText('Tooltip message'));

        expect(tooltip).toHaveClass('bottom');
    });
});
