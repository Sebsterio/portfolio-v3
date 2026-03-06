import { ElementType, ComponentPropsWithoutRef } from 'react';

export type PolymorphicProps<T extends ElementType, Props extends object = object> = Props &
	Omit<ComponentPropsWithoutRef<T>, keyof Props | 'as'> & {
		as?: T;
	};
