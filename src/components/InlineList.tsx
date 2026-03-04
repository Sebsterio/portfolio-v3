import { ReactNode, Fragment, Children } from 'react';
import { AtLeastTwo, XOR } from '@/types';

type InlineListProps = {
	children: AtLeastTwo<ReactNode>;
	separator?: ReactNode;
} & XOR<
	{
		as: 'div';
		className?: string;
	},
	{}
>;

const DEFAULT_SEPARATOR = '•';

const filterItems = (items: ReactNode[]) => items.filter((item) => !!item && !(typeof item === 'string' && item.trim() === ''));

/**
 * Renders inline items separated by a delimiter (default: •).
 * - Enforces at least two items at the type level.
 * - Accepts strings, numbers, or JSX elements.
 * - Filters out null, undefined, false, and empty strings.
 */
export const InlineList = ({ as, children, separator = DEFAULT_SEPARATOR, ...props }: InlineListProps) => {
	const filtered = filterItems(Children.toArray(children));
	const Component = as ?? Fragment;
	const componentProps = as ? props : {};
	return (
		<Component {...componentProps}>
			{filtered.map((item, index) => {
				const isLastItem = index >= filtered.length - 1;
				return (
					<Fragment key={index}>
						<span>{item}</span> {!isLastItem && <span>{separator}</span>}
					</Fragment>
				);
			})}
		</Component>
	);
};

const Div = (props: Omit<InlineListProps, 'as'>) => <InlineList as='div' {...props} />;

InlineList.Div = Div;
