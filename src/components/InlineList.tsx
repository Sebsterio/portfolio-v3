import { ReactNode, Fragment, Children } from 'react';
import { AtLeastTwo } from '@/types';

type InlineListProps = {
	as?: 'div' | typeof Fragment;
	children: AtLeastTwo<ReactNode>;
	separator?: ReactNode;
	className?: string;
};

const DEFAULT_SEPARATOR = '•';

const filterItems = (items: ReactNode[]) => items.filter((item) => !!item && !(typeof item === 'string' && item.trim() === ''));

/**
 * Renders inline items separated by a delimiter (default: •).
 * - Enforces at least two items at the type level.
 * - Accepts strings, numbers, or JSX elements.
 * - Filters out null, undefined, false, and empty strings.
 */
export const InlineList = ({ as: Component = Fragment, children, separator = DEFAULT_SEPARATOR, ...props }: InlineListProps) => {
	const filtered = filterItems(Children.toArray(children));
	return (
		<Component {...props}>
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
