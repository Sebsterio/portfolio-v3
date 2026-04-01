import React, { JSX } from 'react';
import { cn } from '@/lib/utils';

type CloneableChild = React.ReactElement<{ style?: React.CSSProperties; className?: string }>;
type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type TransitionBaseProps = {
	name?: string;
	group?: 'normal' | 'contain' | 'nearest' | string;
	vtClass?: string;
	className?: string;
	classes?: string;
	style?: React.CSSProperties;
};

type TransitionElementProps = TransitionBaseProps & React.PropsWithChildren;
type TransitionDecoratorProps = TransitionBaseProps & { children: CloneableChild };
type TransitionPolymorphicProps<C extends React.ElementType> = TransitionBaseProps & { as: C; ref?: PolymorphicRef<C> } & Omit<
		React.ComponentPropsWithoutRef<C>,
		'as' | 'name' | 'style' | 'ref'
	>;
type TransitionResolverProps<C extends React.ElementType = 'div'> =
	| TransitionPolymorphicProps<C>
	| ({ as?: never; bind: true; wrap?: false } & TransitionDecoratorProps)
	| ({ as?: never; bind?: false; wrap?: boolean } & TransitionElementProps);

type TransitionIntrinsicProps<T extends keyof JSX.IntrinsicElements> = TransitionBaseProps &
	Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'name' | 'style' | 'ref'>;

type AllProps = { as?: unknown; bind?: boolean; wrap?: boolean } & (TransitionDecoratorProps | TransitionElementProps); // AUX

// ================================================================================================================= //

// ── Export & Compound ────────────────────────────────────────────────────────────────────

export { TransitionCompound as VT };

const TransitionCompound = Object.assign(TransitionResolver, {
	Area: TransitionElement,
	Onto: TransitionDecorator,
	As: TransitionPolymorphic,
	Div: createTransitionIntrinsic('div'),
	Span: createTransitionIntrinsic('span'),
	Button: createTransitionIntrinsic('button'),
}) as {
	<C extends React.ElementType = 'div'>(props: TransitionResolverProps<C>): React.ReactNode;
	Area: (props: TransitionElementProps) => React.ReactNode;
	Onto: (props: TransitionDecoratorProps) => React.ReactNode;
	As: <C extends React.ElementType>(props: TransitionPolymorphicProps<C>) => React.ReactNode;
	Div: (props: TransitionIntrinsicProps<'div'>) => React.ReactNode;
	Span: (props: TransitionIntrinsicProps<'span'>) => React.ReactNode;
	Button: (props: TransitionIntrinsicProps<'button'>) => React.ReactNode;
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
 * Backdrop:  does not sample through at all.
 * Target:    containers without backdrop-filter - on self or descendants
 */
function TransitionPolymorphic<C extends React.ElementType = 'div'>(props: TransitionPolymorphicProps<C>) {
	const { as, name, group, vtClass, style, className, classes, ...rest } = props;
	const Tag = as as React.ElementType;
	return (
		<Tag
			className={cn(className, classes)}
			style={withTransitionStyle(style, name, vtClass, group)}
			{...rest} //
		/>
	);
}

/**
 * Holds `viewTransitionName` in a layout-invisible wrapper.
 * Backdrop: samples through from **grand-children** - when parent is not transitioning.
 * Target: 	 **groups of cards & surfaces**, page sections - layout-neutral containers.
 *
 * Caveats:
 * —  Box model styles may glitche during transition (when `display: block`)
 * — `backdrop-filter` on children does not sample through during transition.
 * — `space-*` utilities on parent are not applied, except during transition.
 *
 * Rationale:
 * — `display: contents` — no box, no compositor promotion; children's `backdrop-filter` applies behind the parent.
 * — `display: block` — fixes Chromium issue making VT elements have a zero-size snapshot; creates a compositing boundary, blocking children's `backdrop-filter`.
 */
function TransitionElement({ name, group, vtClass, className, classes, style, ...props }: TransitionElementProps) {
	return (
		<div
			className={cn('contents in-data-transitioning:block', className, classes)}
			style={withTransitionStyle(style, name, vtClass, group)}
			{...props}
		/>
	);
}

/**
 * Injects `viewTransitionName` onto the child element.
 * Backdrop: samples through on cloned child only - also during transition
 * Target:   **directly on cards & surface elements**
 *
 * Caveats:
 * — `backdrop-filter` of child's descendants does NOT sample throgh.
 * — `cloneElement` breaks `React.memo` bailouts on the child unconditionally.
 * — Child must accept both `style` and `className` props.
 */
function TransitionDecorator({ name, group, vtClass, children, className, classes, style }: TransitionDecoratorProps) {
	return React.cloneElement(children, {
		className: cn(children.props.className, className, classes),
		style: withTransitionStyle({ ...children.props.style, ...style }, name, vtClass, group),
	});
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────

function withTransitionStyle(style: React.CSSProperties | undefined, name?: string, vtClass?: string, group?: string): React.CSSProperties {
	return {
		...style,
		...(name && { viewTransitionName: name }),
		...(group && { viewTransitionGroup: group }),
		...(vtClass && { viewTransitionClass: vtClass }),
	};
}

function createTransitionIntrinsic<T extends keyof JSX.IntrinsicElements>(tag: T) {
	return function TransitionIntrinsic(props: TransitionIntrinsicProps<T>) {
		return TransitionPolymorphic<T>({ as: tag, ...props } as TransitionPolymorphicProps<T>);
	};
}
