import React, { JSX } from 'react';
import { cn } from '@/lib/utils';

type TransitionVarName = '--vt-name' | '--vt-class';
type TransitionStyle = React.CSSProperties & Partial<Record<TransitionVarName, string>>;

type CloneableChild = React.ReactElement<{ style?: TransitionStyle; className?: string }>;
type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

type TransitionBaseProps = {
	slot?: string;
	name?: string;
	group?: 'normal' | 'contain' | 'nearest' | string;
	classes?: string;
	className?: string;
	style?: React.CSSProperties;
};

type TransitionElementProps = React.PropsWithChildren<TransitionBaseProps>;
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

// ── Export & Compound ────────────────────────────────────────────────────────────────────

export { TransitionCompound as ViewTransition };
export { TransitionCompound as VT };

const TransitionCompound = Object.assign(TransitionResolver, {
	Area: TransitionWrapper,
	Onto: TransitionDecorator,
	As: TransitionPolymorphic,
	Div: createTransitionIntrinsic('div'),
}) as {
	<C extends React.ElementType = 'div'>(props: TransitionResolverProps<C>): React.ReactNode;
	Area: (props: TransitionElementProps) => React.ReactNode;
	Onto: (props: TransitionDecoratorProps) => React.ReactNode;
	As: <C extends React.ElementType>(props: TransitionPolymorphicProps<C>) => React.ReactNode;
	Div: (props: TransitionIntrinsicProps<'div'>) => React.ReactNode;
};

// ── Resolver implementation ───────────────────────────────────────────────────

function TransitionResolver<C extends React.ElementType = 'div'>(props: TransitionResolverProps<C>) {
	const { as, bind, wrap = !bind, ...rest } = props as AllProps;

	if (as) return <TransitionPolymorphic {...(props as TransitionPolymorphicProps<C>)} />;
	if (bind) return <TransitionDecorator {...(rest as TransitionDecoratorProps)} />;
	if (wrap) return <TransitionWrapper {...(rest as TransitionElementProps)} />;

	return null;
}

// ── Strategy implementations ──────────────────────────────────────────────────

/**
 * Renders as an arbitrary element or component, injecting only `viewTransitionName` via the `style` prop.
 * Backdrop:  does not sample through at all.
 * Target:    containers without backdrop-filter - on self or descendants
 */
function TransitionPolymorphic<C extends React.ElementType = 'div'>(props: TransitionPolymorphicProps<C>) {
	const { as, name, group, classes, style, className, slot, ...rest } = props;
	const Tag = as as React.ElementType;
	return (
		<Tag
			className={getTransitionClassName(className, slot)}
			style={getTransitionStyle({ name, group, classes, style })}
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
function TransitionWrapper(props: TransitionElementProps) {
	const { name, group, classes, style, className, slot, ...rest } = props;
	return (
		<div
			className={getTransitionClassName('contents in-data-transitioning:block', className, slot)}
			style={getTransitionStyle({ name, group, classes, style })}
			{...rest}
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
function TransitionDecorator({ children, name, group, classes, className, slot, style }: TransitionDecoratorProps) {
	return React.cloneElement(children, {
		className: getTransitionClassName(children.props.className, className, slot),
		style: getTransitionStyle({ name, group, classes, style: { ...children.props.style, ...style } }),
	});
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────

function getTransitionClassName(...classNames: (string | undefined)[]): string {
	return cn('vt-slot', ...classNames);
}

function getTransitionStyle({ name, group, classes, style }: TransitionBaseProps): TransitionStyle {
	return {
		...style,
		...(name && { '--vt-name': name }),
		...(classes && { '--vt-class': classes }),
		...(group && { viewTransitionGroup: group }),
	};
}

function createTransitionIntrinsic<T extends keyof JSX.IntrinsicElements>(tag: T) {
	return function TransitionIntrinsic(props: TransitionIntrinsicProps<T>) {
		return TransitionPolymorphic<T>({ as: tag, ...props } as TransitionPolymorphicProps<T>);
	};
}
