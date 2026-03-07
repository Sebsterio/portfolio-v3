import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TestComponent } from './TestComponent';

test('TestComponent', () => {
	render(<TestComponent />);
	expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeDefined();
});
