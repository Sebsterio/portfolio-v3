import React, { JSX, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type PropsWithChild = { children: React.ReactElement<{ style?: React.CSSProperties; className?: string }> };

type TransitionProps = {
	name?: string;
	className?: string;
	style?: React.CSSProperties;
};

type TransitionElementProps = TransitionProps & PropsWithChildren & { classes?: string };
type TransitionDecoratorProps = TransitionProps & PropsWithChild & { classes?: string };
type TransitionResolverProps = { bind?: boolean; wrap?: boolean } & (TransitionElementProps | TransitionDecoratorProps); // type TransitionResolverProps = XOR <({ clone?: boolean } & TransitionElementProps), ({ slot?: boolean } & TransitionDecoratorProps)>;

// ----------------------------------------------------------------------------

export { TransitionCompound as VT };

const TransitionCompound = Object.assign(TransitionResolver, {
	Area: TransitionElement,
	Onto: TransitionDecorator,
}) as {
	(props: TransitionResolverProps): JSX.Element;
	Area: (props: TransitionElementProps) => JSX.Element;
	Onto: (props: TransitionDecoratorProps) => JSX.Element;
};

function TransitionResolver({ bind, wrap = !bind, ...props }: TransitionResolverProps) {
	if (bind) return <TransitionDecorator {...(props as TransitionDecoratorProps)} />;
	if (wrap) return <TransitionElement {...(props as TransitionElementProps)} />;
}

/**
 * Holds `viewTransitionName` in a layout-invisible wrapper.
 *
 * **NOTE: Only apply layout-neutral classes**
 * — anything affecting the box model may cause glitches when `display: block` kicks in during transition.
 *
 * Caveats:
 * — `backdrop-filter` on children does not sample through during transition.
 * — `space-*` utilities on parent are not applied, except during transition.
 *
 * Rationale:
 * — `display: contents` — no box, no compositor promotion; children's `backdrop-filter` samples through to the document behind..
 * — `display: block` — fixes Chromium issue making VT elements have a zero-size snapshot; creates a compositing boundary, blocking children's `backdrop-filter`.
 */
function TransitionElement({ name, className, classes, style, ...props }: TransitionElementProps) {
	return (
		<div
			className={cn('contents in-data-transitioning:block', className, classes)}
			style={{ ...style, ...(name && { viewTransitionName: name }) }}
			{...props}
		/>
	);
}

/**
 * Injects `viewTransitionName` directly onto the child element.
 *
 * Caveats:
 * — `cloneElement` breaks `React.memo` bailouts on the child.
 * — Child must accept `style` and `className` props.
 */
function TransitionDecorator({ name, children, className, classes, style }: TransitionDecoratorProps) {
	return React.cloneElement(children, {
		className: cn(children.props.className, className, classes),
		style: { ...children.props.style, ...style, ...(name && { viewTransitionName: name }) },
	});
}
