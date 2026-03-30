import React from 'react';
import { cn } from '@/lib/utils';

type TransitionName = { name?: string };
type TransitionStyling = { style?: React.CSSProperties; className?: string; classes?: string };
type CloneableChild = React.ReactElement<{ style?: React.CSSProperties; className?: string }>;

type TransitionElementProps = TransitionName & TransitionStyling & React.PropsWithChildren;
type TransitionDecoratorProps = TransitionName & TransitionStyling & { children: CloneableChild };

type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type TransitionPolymorphicProps<C extends React.ElementType> = TransitionName & {
	as: C;
	style?: React.CSSProperties;
	ref?: PolymorphicRef<C>;
} & Omit<React.ComponentPropsWithoutRef<C>, 'as' | 'name' | 'style' | 'ref'>;

type TransitionResolverProps<C extends React.ElementType = 'div'> =
	| TransitionPolymorphicProps<C>
	| ({ as?: never; bind: true; wrap?: false } & TransitionDecoratorProps)
	| ({ as?: never; bind?: false; wrap?: boolean } & TransitionElementProps);

type AllProps = { as?: unknown; bind?: boolean; wrap?: boolean } & (TransitionDecoratorProps | TransitionElementProps); // AUX

// ================================================================================================================= //

// ── Export ────────────────────────────────────────────────────────────────────

export { TransitionCompound as VT };

const TransitionCompound = Object.assign(TransitionResolver, {
	Area: TransitionElement,
	Onto: TransitionDecorator,
	As: TransitionPolymorphic,
}) as {
	<C extends React.ElementType = 'div'>(props: TransitionResolverProps<C>): React.ReactNode;
	Area: (props: TransitionElementProps) => React.ReactNode;
	Onto: (props: TransitionDecoratorProps) => React.ReactNode;
	As: <C extends React.ElementType>(props: TransitionPolymorphicProps<C>) => React.ReactNode;
};

// ── Resolver implementation ───────────────────────────────────────────────────

function TransitionResolver<C extends React.ElementType = 'div'>(props: TransitionResolverProps<C>) {
	const { as, bind, wrap = !bind, ...rest } = props as AllProps;

	if (as) return <TransitionPolymorphic {...(props as TransitionPolymorphicProps<C>)} />;
	if (bind) return <TransitionDecorator {...(rest as TransitionDecoratorProps)} />;
	if (wrap) return <TransitionElement {...(rest as TransitionElementProps)} />;
}

// ── Strategy implementations ──────────────────────────────────────────────────

/**
 * Renders as an arbitrary element or component, injecting only `viewTransitionName` via the `style` prop.
 *
 * Caveats:
 * — `backdrop-filter` on children does not sample through at all.
 */
function TransitionPolymorphic<C extends React.ElementType = 'div'>({ as, name, style, ...props }: TransitionPolymorphicProps<C>) {
	const Tag = as as React.ElementType;
	return <Tag style={{ ...style, ...(name && { viewTransitionName: name }) }} {...props} />;
}

/**
 * Holds `viewTransitionName` in a layout-invisible wrapper.
 *
 * **NOTE: Only apply layout-neutral classes**
 * — anything affecting the box model may cause glitches when `display: block`
 *   kicks in during transition.
 *
 * Caveats:
 * — `backdrop-filter` on children does not sample through during transition.
 * — `space-*` utilities on parent are not applied, except during transition.
 *
 * Rationale:
 * — `display: contents` — no box, no compositor promotion; children's
 *   `backdrop-filter` samples through to the document behind.
 * — `display: block` — fixes Chromium issue making VT elements have a zero-size
 *   snapshot; creates a compositing boundary, blocking children's `backdrop-filter`.
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
 * Injects `viewTransitionName` directly onto the child element via `React.cloneElement`.
 *
 * Caveats:
 * — `cloneElement` breaks `React.memo` bailouts on the child unconditionally.
 * — Child must accept both `style` and `className` props.
 */
function TransitionDecorator({ name, children, className, classes, style }: TransitionDecoratorProps) {
	return React.cloneElement(children, {
		className: cn(children.props.className, className, classes),
		style: { ...children.props.style, ...style, ...(name && { viewTransitionName: name }) },
	});
}
