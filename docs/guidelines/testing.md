# Unit test React components

The general unit testing guidelines for react components are introduced in this section.
Please refer to the testing atomic component section for information on testing theme components.

### lets consider this image component&#x20;

## 1. Image component code

```tsx
import classNames from 'classnames'

interface ImageProps {
  url: string
  loading: boolean
}

export const Image = (props: ImageComponentProps) => {
  const { url, loading } = props
  const src = url || ''

  const renderDefaultStyle = classNames(imageStyle, {
    pulse: loading
  })

  return (
    <img
      className={renderDefaultStyle}
      src={url}
      alt="Avatar"
      placeholder="fetched image"
      loading="lazy"
    />
  )
}
```

When you unit test a component that renders something, first you need to make sure the component actually renders. Let's assert that in our `Image.test.tsx`

> Always create a specs file in the test folder that is in same folder as the component itself, following this naming convention `MyComponent.test.tsx`

## 2. Image component test

```tsx
import * as React from 'react'
import { render, screen } from '@testing-library/react'

import { Image } from './Image'

// We create a block for a suite of tests.
// For better naming, and separation of concerns, as well as scoped context
describe('Render test suite', () => {
  describe('Image renders initially', () => {
    // The actual test. It should be a single sentence that describes our assertions given a context or conditions
    // It is recommended to write `it should render with/when/while` for render tests
    test('should render when called', () => {
      // Use the render utility method to render the component in the js-dom
      // js-dom simulates a DOM environment in node. This allows to use most DOM APIs and Web standards
      const { container } = render(<Image url="" loading={true} />)
      // Is the component in the document ? Let's assert it
      expect(container).toBeInTheDocument()
    })
  })

  describe('Image states', () => {
    describe('Loading', () => {
      test('should animate while loading image', () => {
        render(<Image url="" loading={true} />)
        // expect pulse classname of the img element
        expect(screen.getByRole('img')).toHaveClass('pulse')
      })
    })

    describe('Loaded', () => {
      test('should render with src attribute set', () => {
        const { rerender } = render(<Image url="" loading={true} />)
        rerender(<Image url="remote.image.com" loading={false} />)

        // When this component rerenders with src value, does the ui updates accordingly ?
        expect(screen.getByRole('img')).not.toHaveClass('pulse')
        expect(screen.getByRole('img')).toHaveAttribute(
          'src',
          'remote.image.com'
        )
      })
    })

    describe('Loads then renders a new image', () => {
      test('should animate then render with src attribute set to new image', () => {
        // Arrange
        const { rerender } = render(<Image url="" loading={true} />)
        const element = screen.getByRole('img')
        rerender(<Image url="remote.image.com" loading={false} />)
        // Assert
        // when this component rerenders with src value, does the ui updates accordingly ?
        expect(element).not.toHaveClass('pulse')
        expect(element).toHaveAttribute('src', 'remote.image.com')
        // Arrange
        // rerender the component with new props
        rerender(<Image url="remote.image.com" loading={true} />)
        // Assert
        expect(element).toHaveClass('pulse')
        expect(element).toHaveAttribute('src', 'remote.image.com')
        // Arrange
        // rerender the component with other props
        rerender(<Image url="second.remote.image.com" loading={false} />)
        // Assert
        expect(element).not.toHaveClass('pulse')
        expect(element).toHaveAttribute('src', 'second.remote.image.com')
      })
    })
  })
})
```

### 2.1 Image component test - explanation

1. First we import the render and screen utilities from react-testing-library.

2. Then we import the component we want to test. If we had more, we would import them also.

3. We create a first block of tests. The `describe` should be used whenever we want to group tests or need to give a cleaner structure and useful information to understand what each test suite is about. The first describe simply tells us that we are going to test if the component renders in a given context without any specific intention. For the `ImageComponent` it is overkill. But sometimes you need to make sure that the component is not affected by some global setup or abstractions that can falsify your test.

4. The second describe is there to describe the component different states. We then describe the first state, in which we render the component with some props, then asserts the underlying element's behavior. Prefer using `screen.getByRole(role)` and other [roles queries](https://testing-library.com/docs/queries/byrole) to assert your element as it ensures that you also test the accessibility of your elements

5. Since our component can rerender differently depending its props, we implement a third test suite and use the `rerender` utility to keep our test close to the running code and the user interactions.

### 2.2 Jest output

```bash
yarn test
yarn run v1.22.10
LANG=en_US.UTF-8 jest --passWithNoTests
 PASS  src/components/Image/Image.test.tsx
  Image renders initially
    ✓ should renders when called (20 ms)
  Image states
    Loading
      ✓ should animate while loading image (47 ms)
    Loaded
      ✓ should render with src attribute set (19 ms)
    Loads then renders new image
      ✓ should animate then render with src attribute set to new image (10 ms)

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        3.498 s
Ran all test suites.
✨  Done in 4.59s.
```

It is nice and clear to read. There is not too much info, and enough to give you and your colleagues a better understanding of what was the purpose of these tests, which ones broke under which conditions, and if they are still relevant.

### 2.3 Avoid testing implementation details

Always remember to test the behavior of your components over life cycles and user interactions.

Do not test implementation details

- <a href="https://kentcdodds.com/blog/testing-implementation-details">Testing Implementation Details - Kent C Dodds</a>
- <a href="https://mswjs.io/docs/recipes/request-assertions">Request assertions - Mock Service Worker Documentation</a>

### 2.4 Edge cases

As the code evolves, there are some edge cases we need to consider

```tsx
const src = url || ''

return (
  <img
    className={renderDefaultStyle}
    src={url}
    alt="Avatar"
    placeholder="fetched image"
    loading="lazy"
  />
)
```

At first, the url does not exist, this results in an `img` tag with an empty `src` attribute. This is bad for at least for three reasons

- the browser will display a broken image element at first load, because this is a native behavior for broken urls or empty `src` values
- it leads to bad UX and negative accessibility
- an empty string default to `/` route

> When the browser engine encounters a tag with empty src, it will request your index page And just like that, you raise a traffic spike on your servers

Don't do this either :

```tsx
var img = new Image()
```

Reference: <a href="https://humanwhocodes.com/blog/2009/11/30/empty-image-src-can-destroy-your-site/">Empty image src can destroy your site - Human who codes</a>

In addition to this fix, the Design team required engineers to display a pulsing blue background whenever a new image is fetched, in addition to initial load. One way to solve this is to change the code into something like this

```tsx
...
  return (
    <object className={renderDefaultStyle}>
      {!loading && (
        <img
          className={renderDefaultStyle}
          src={url}
          alt="landscape"
          placeholder="fetched image"
          loading="lazy"
        />
      )}
    </object>
  )
```

We wrap our image inside an `object` tag. Don't be afraid of this tag, it is a standard and perfectly usable tag that produces a node with content capabilities such like a `img` can do e.g

Reference: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object">\<object>: The External Object element</a>

```tsx
<object data="someUrl" type="image/jpg" width="100" height="200"></object>
```

Here we just want that tag to contain our image, and if the image is not downloaded, display an animated background. Doing so will break our tests and produce these errors

```bash
FAIL  src/components/ImageComponent/Image.test.tsx
ImageComponent renders initially
  ✓ should renders when called (19 ms)

Image states
  Loading
    ✕ should animate while loading image (58 ms)

  Loaded
    ✓ should render with src attribute set (25 ms)

  Loads then renders new image
    ✕ should animate then render with src attribute set to new image (11 ms)

```

Since we correctly structured our test, we can immediately see where the problem lies, and even understand without even looking at the code, the reason why.

Few lines down the error stack :

```bash
● Image states › Loading › should animate while loading image

  TestingLibraryElementError: Unable to find an accessible element with the role "img"

  There are no accessible roles. But there might be some inaccessible roles.
  If you wish to access them, then set the `hidden` option to `true`.
  Learn more about this link https://https://testing-library.com/docs/dom-testing-library/api-queries#byrole
  ...
<body>
  <div>
    <object
      class="imageStyle pulse"
    />
  </div>
</body>
```

The runner says it can't query the `img` element. And indeed, it's not in the outputted DOM To test if an element is present in the DOM use the `queryBy*` queries. Trying to `getBy*` will throw an error since you assume the element is there and you're trying to **get** it.

```tsx
describe('Loading', () => {
  test('should animate while loading image', () => {
    render(<Image url={''} loading={true} />)
    const element = screen.queryByRole('img')

    expect(element).not.toBeInTheDocument()
  })
})
```

Let's also change the second test suite

```tsx
describe('Loads then renders new image', () => {
  const getImage = () => {
    const element = screen.queryByRole('img')
    return element
  }

  test('should animate then render with src attribute set to new image', () => {
    // Arrange
    const { rerender } = render(<Image url="" loading={true} />)
    const initial = getImage()
    // Assert
    expect(initial).toHaveClass('pulse')
    expect(initial).not.toBeInTheDocument()

    // Arrange
    rerender(<Image url="remote.image.com" loading={false} />)
    const secondRender = getImage()
    // Assert
    expect(secondRender).not.toHaveClass('pulse')
    expect(secondRender).toHaveAttribute('src', 'remote.image.com')

    // Arrange
    rerender(<Image url="remote.image.com" loading={true} />)
    const thirdRender = getImage()
    // Assert
    expect(thirdRender).toHaveClass('pulse')
    expect(thirdRender).not.toBeInTheDocument()

    //Arrange
    rerender(<Image url="second.remote.image.com" loading={false} />)
    const fourthRender = getImage()
    // Assert
    expect(fourthRender).not.toHaveClass('pulse')
    expect(fourthRender).toHaveAttribute('src', 'second.remote.image.com')
  })
})
```

> ℹ️ **Now whenever the component rerenders, we know that we need to check the un-existence of the `img`.\
> Using queries, we can assert this result. We also create a small utility function inside of the describe function. This abstraction makes sense.**

> **It is important to understand why it is not a good idea to abstract too much, and why \***[_**prefer duplication over the wrong abstraction**_](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction) **is actually a better practice.**

And that's it ! Your first unit test done right. Of course this is a primitive example, but applying these simple principles will guide you through subsequent and more complex component unit tests.

You should try the [testing-playground](https://testing-playground.com/) ! Simply paste the underlying html of your component in the code editor, and it will suggest you optimized queries and matchers.

## 3. Testing naming conventions

**data-testid naming conventions**

Every data-testid written in the app should follow the kebab case naming convention

```tsx
<div data-test-selector="kebab-case-example"
```

Reference: <a href="https://testing-library.com/docs/dom-testing-library/api-configuration/#testidattribute">testId attribute - React Testing Library</a>

## References

- <a href="https://kentcdodds.com/blog/testing-implementation-details">Testing Implementation Details - Kent C Dodds</a>
- <a href="https://kentcdodds.com/blog/avoid-nesting-when-youre-testing">Avoid Nesting when you're Testing - Kent C Dodds</a>
- <a href="https://kentcdodds.com/blog/common-mistakes-with-react-testing-library">Common mistakes with React Testing Library - Kent C Dodds</a>
