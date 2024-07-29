import { Meta, StoryObj } from '@storybook/angular';

import { GridComponent } from './grid.component';

type ComponentWithCustomControls = GridComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Grid',
  component: GridComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Grid` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Grid: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
