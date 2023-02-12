# Testing

There are broadly four categories of tests: static, unit, integration, and end-to-end. The general principle is to, "Write tests. Not too many. Mostly integration."
([Kent C. Dodds](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)). However in this library we will focus only on the first two categories.

## Static tests

TypeScript [will be introduced](https://github.com/melaniebrgr/react-chemdoodleweb/issues/10) in the future to catch type and type errors during development.

## Component unit tests

Use the [testing library](https://www.npmjs.com/package/@testing-library/react) methods for component unit tests. Component unit tests consist of three types: **virtual render**, **event**, **visual render**. Tests should be written following the Arrange-Act-Assert (AAA) pattern.

#### 1. Virtual render tests

Render tests make sure that the component actually renders. Use queries in [priority order](https://testing-library.com/docs/queries/about#priority) and assert it's presense with `toBeInTheDocument`. Do not use inline component snapshot tests.

```tsx
import { render } from '@testing-library/react'
import { SearchBox } from './SearchBox'

describe('SearchBox', () => {
  test('renders', () => {
    // ARRANGE
    const { container } = render(<SearchBox click={click} />)
    // ASSERT
    expect(container).toBeInTheDocument()
  })
})
```

#### 2. Event tests

Render tests make sure that the component behaves as expected. If a component handles a user event test it with the `userEvent` method. `userEvent` makes sure to fire all events associated with a change event, like `keyPress`, `keyDown`, etc. Mock handlers and other functions with `jest.fn()`.

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Fetch from './fetch'

describe('SearchBox', () => {
  test('on click it displays greeting', async () => {
    // ARRANGE
    render(<Fetch url="/greeting" />)
    // ACT
    await userEvent.click(screen.getByText('Load Greeting'))
    await screen.findByRole('heading')
    // ASSERT
    expect(screen.getByRole('heading')).toHaveTextContent('hello there')
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

#### 3. Visual render tests

To come.
