export default defineAppConfig({
  ui: {
    colors: {
      primary: 'primary',
      secondary: 'secondary',
      tertiary: 'tertiary',
      quaternary: 'quaternary',
      text: 'text',
      negative: 'negative',
    },
    slider: {
      slots: {
        root: 'text-(--ds-color-brand-default) ',
        thumb: 'bg-(--ds-color-brand-default)',
        track: 'bg-(--ds-color-bg-quaternary)',
      },
      variants: {
        color: {
          primary: {
            range: 'bg-(--ds-color-brand-default)',
          },
        },
      },
    },
    progress: {
      slots: {
        base: 'h-1 rounded-4xl',
        indicator: 'rounded-4xl',
      },
      variants: {
        color: {
          primary: {
            indicator: 'bg-(--ds-color-brand-default)',
          },
        },
      },
    },
    icons: {},
    container: {
      base: `max-w-[1240px]`,
    },
    tabs: {
      slots: {
        root: 'flex items-start gap-2',
        list: 'relative inline-flex p-0 group !w-auto gap-4',
        indicator: 'absolute transition-[translate,width] duration-200 !h-[2px]',
        trigger:
          `cursor-pointer group relative inline-flex items-center min-w-0 hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75 transition-colors !px-0`,
        leadingIcon: 'shrink-0',
        leadingAvatar: 'shrink-0',
        leadingAvatarSize: '',
        label: 'truncate',
        trailingBadge: 'shrink-0',
        trailingBadgeSize: 'sm',
        content: 'focus:outline-none w-full',
      },
      variants: {
        color: {
          primary: '',
          secondary: '',
          success: '',
          info: '',
          warning: '',
          error: '',
          neutral: '',
        },
        variant: {
          pill: {
            list: 'bg-elevated rounded-lg',
            trigger: 'grow',
            indicator: 'rounded-md shadow-xs',
          },
          link: {
            list: 'border-default',
            indicator: 'rounded-full',
            trigger: 'focus:outline-none',
          },
        },
        orientation: {
          horizontal: {
            root: 'flex-col',
            list: 'w-full',
            indicator: 'left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)',
            trigger: 'justify-center',
          },
          vertical: {
            list: 'flex-col',
            indicator: 'top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)',
          },
        },
        size: {
          xs: {
            trigger: 'px-2 py-1 text-xs gap-1',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
          },
          sm: {
            trigger: 'px-2.5 py-1.5 text-xs gap-1.5',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
          },
          md: {
            trigger: 'px-3 py-1.5 text-sm gap-1.5',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
          },
          lg: {
            trigger: 'px-3 py-2 text-sm gap-2',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
          },
          xl: {
            trigger: 'px-3 py-2 text-base gap-2',
            leadingIcon: 'size-6',
            leadingAvatarSize: 'xs',
          },
        },
      },
      compoundVariants: [
        {
          orientation: 'horizontal',
          variant: 'pill',
          class: {
            indicator: 'inset-y-1',
          },
        },
        {
          orientation: 'horizontal',
          variant: 'link',
          class: {
            list: 'border-b -mb-px',
            indicator: '-bottom-px h-px',
          },
        },
        {
          orientation: 'vertical',
          variant: 'pill',
          class: {
            indicator: 'inset-x-1',
            list: 'items-center',
          },
        },
        {
          orientation: 'vertical',
          variant: 'link',
          class: {
            list: 'border-s -ms-px',
            indicator: '-start-px w-px',
          },
        },
        {
          color: 'primary',
          variant: 'pill',
          class: {
            indicator: 'bg-primary',
            trigger: 'data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          },
        },
        {
          color: 'neutral',
          variant: 'pill',
          class: {
            indicator: 'bg-inverted',
            trigger: 'data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted',
          },
        },
        {
          color: 'primary',
          variant: 'link',
          class: {
            indicator: 'bg-(--ds-color-brand-default)',
            trigger: `
                    data-[state=active]:text-(--ds-color-brand-default) 
                    focus-visible:ring-2 
                    focus-visible:ring-inset 
                    focus-visible:ring-primary`,
          },
        },
        {
          color: 'neutral',
          variant: 'link',
          class: {
            indicator: 'bg-inverted',
            trigger: 'data-[state=active]:text-highlighted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted',
          },
        },
      ],
      defaultVariants: {
        color: 'primary',
        variant: 'pill',
        size: 'md',
      },
    },
    modal: {
      slots: {
        overlay: 'bg-[rgba(35,38,43,0.24)] backdrop-blur-sm',
        content: `bg-white max-md:!translate-y-0 max-md:!max-w-[767px] max-md:!top-auto`,
        header: `md:flex-1 md:pt-6 border-0 px-4 min-h-auto md:px-8`,
        wrapper: `w-full`,
        title: `[&:not(:last-child)]:mb-2 mb-0 font-bold text-xl md:text-2xl text-grey-900 mb-2 max-w-[calc(100%-50px)]`,
        description: `tracking-0 mt-0 font-medium text-base text-grey-600`,
        body: `sm:p-3 p-0 px-3 pb-3 border-0 sm:pt-0 md:px-8 flex-auto`,
        footer: `border-0 pt-0 px-3 sm:px-3 block md:px-8 md:pb-8`,
        close: 'absolute top-4 end-4 w-8 h-8 rounded-full font-small',
      },
      variants: {
        fullscreen: {
          true: {
            content: 'inset-0',
          },
          false: {
            content: 'rounded-t-3xl rounded-b-none shadow-lg ring ring-default translate-y-0 top-auto bottom-0 w-full md:rounded-3xl md:bottom-auto md:top-1/2 md:-translate-y-1/2',
          },
        },
      },

      compoundVariants: [
        {
          scrollable: true,
          fullscreen: false,
          class: {
            overlay: 'grid place-items-center p-4 sm:py-8',
          },
        },
        {
          scrollable: true,
          fullscreen: false,
          class: {
            content: 'translate-x-0 translate-y-0 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden',
          },
        },
      ],
    },
    link: {
      base: `
            [color:var(--ds-color-fg-tertiary)]
            [hover:color:var(--ds-color-fg-tertiary-hover)]
            [active:color:var(--ds-color-fg-tertiary)]
            `,
      variants: {
        active: {
          true: '',
          false: '',
        },
        disabled: {
          true: `
                 [color:var(--ds-color-fg-pale)]
                `,
        },
      },
    },
    input: {
      slots: {
        root: '',
        base: 'transform-color font-[var(--ds-typography-body-p1-medium-font-weight)] peer h-14',
      },
      variants: {
        variant: {
          primary: {
            root: 'd-block w-full relative',
            trailingIcon: 'pу-[var(--ds-spacing-20)] pr-[var(--ds-spacing-16)]',
            trailing: 'pу-[var(--ds-spacing-20)] pr-[var(--ds-spacing-16)]',
            base: 'bg-[var(--ds-color-primitive-light-200)] hover:bg-[var(--ds-color-control-input-hover)] disabled:bg-[var(--ds-color-control-input-disabled)] border border-solid border-[var(--ds-color-control-input-border)] focus:border-[var(--ds-color-control-input-focus-border)] disabled:border-[var(--ds-color-border-primary)] rounded-[var(--ds-rounding-component-input-xl)] placeholder:text-[var(--ds-color-fg-tertiary)] [color:var(--ds-color-fg-primary)]',
          },
        },
        color: {
          negative: {
            base: `![border-color:var(--ds-color-sentiment-negative-fg)]`,
          },
        },
        size: {
          xl: '!pt-[27px] bg-white !pb-[9px] !px-[var(--ds-spacing-20)] [column-gap:var(--ds-spacing-8)] tracking-[var(--ds-typography-body-p1-letter-spacing)] [font-size:var(--ds-typography-body-p1-font-size)] [line-height:var(--ds-typography-body-p1-line-height)]',
        },
      },
      defaultVariants: {
        variant: 'primary',
        color: 'primary',
        size: 'xl',
      },
      compoundVariants: [
        {
          color: 'error',
          class: 'ring-0 border-error',
        },
      ],
    },
    textarea: {
      slots: {
        root: '',
        base: 'transition-colors font-[var(--ds-typography-body-p1-medium-font-weight)] peer w-full',
      },
      variants: {
        variant: {
          primary: {
            root: 'd-block w-full relative',
            base: 'bg-[var(--ds-color-primitive-light-200)] hover:bg-[var(--ds-color-control-input-hover)] disabled:bg-[var(--ds-color-control-input-disabled)] border border-solid border-[var(--ds-color-control-input-border)] focus:border-[var(--ds-color-control-input-focus-border)] disabled:border-[var(--ds-color-border-primary)] rounded-[var(--ds-rounding-component-input-xl)] placeholder:text-[var(--ds-color-fg-tertiary)] text-[var(--ds-color-fg-primary)]',
          },
          outline: {
            root: 'd-block w-full relative',
            base: 'bg-[var(--ds-color-primitive-light-200)] hover:bg-[var(--ds-color-control-input-hover)] disabled:bg-[var(--ds-color-control-input-disabled)] border border-solid border-[var(--ds-color-control-input-border)] focus:border-[var(--ds-color-control-input-focus-border)] disabled:border-[var(--ds-color-border-primary)] rounded-[var(--ds-rounding-component-input-xl)] placeholder:text-[var(--ds-color-fg-tertiary)] text-[var(--ds-color-fg-primary)]',
          },
        },
        color: {
          primary: {
            base: '',
          },
        },
        size: {
          xl: {
            base: 'pt-[27px] bg-white pb-[9px] px-[var(--ds-spacing-20)] tracking-[var(--ds-typography-body-p1-letter-spacing)] text-[length:var(--ds-typography-body-p1-font-size)] leading-[var(--ds-typography-body-p1-line-height)]',
          },
        },
      },
      defaultVariants: {
        variant: 'primary',
        color: 'primary',
        size: 'xl',
      },
    },
    button: {
      slots: {
        base: [
          'transition-colors ',
          'rounded-full !leading-[1.2]',
          'cursor-pointer',
          'transition-colors',
          'focus-visible:outline',
          'justify-center',
          'cursor-pointer',
        ],
        leadingIcon: 'shrink-0',
        leadingAvatar: 'shrink-0',
        leadingAvatarSize: '',
        trailingIcon: 'shrink-0',
      },
      variants: {
        color: {
          tertiary: {
            base: `bg-(--ds-color-control-accent-default) text-(--ds-color-brand-default)`,
          },
        },
        variant: {
          primary: {},
          secondary: {
            base: `border border-(--ds-color-border-secondary) bg-(--ds-color-bg-primary) text-(--ds-color-fg-secondary)`,
          },
          dashed: {
            base: `py-4 gap-2 text-sm bg-transparent border-2 border-dashed border-brand-400 text-grey-900 hover:bg-brand-100 active:bg-brand-150 active:text-grey-900`,
          },
        },
        size: {
          xs: {
            base: '',
            leadingIcon: 'size-5',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-5',
          },
          sm: {
            base: '',
            leadingIcon: 'size-4',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-4',
          },
          md: {
            base: '',
            leadingIcon: 'size-4',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5',
          },
          lg: {
            base: `text-sm py-3`,
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5',
          },
          xl: {
            base: [
              'px-[32px]',
              'py-[18px]',
              'gap-[8px]',
              'text-[16px]',
              'font-semibold',
            ],
            leadingIcon: 'size-5',
            leadingAvatarSize: 'xs',
            trailingIcon: 'size-5',
          },
        },
        block: {
          true: {
            base: 'w-full justify-center',
            trailingIcon: 'ms-auto',
          },
        },
        square: {
          true: '',
        },
        leading: {
          true: '',
        },
        trailing: {
          true: '',
        },
        loading: {
          true: '[&_.content-button]:hidden',
        },
        active: {
          true: {
            base: '',
          },
          false: {
            base: '',
          },
        },
      },
      compoundVariants: [
        {
          variant: 'primary',
          color: 'error',
          class: `bg-[var(--ds-color-primitive-red-250)]
                  text-[var(--ds-color-primitive-red-700)]
                  `,
        },
        {
          variant: 'primary',
          color: 'primary',
          class: `
                  border-none

                  bg-[var(--ds-color-control-primary-default)]
                  text-[var(--ds-color-control-primary-elevate)]
                  hover:bg-[var(--ds-color-control-primary-hover)]
                  active:bg-[var(--ds-color-control-primary-active)]
                  active:text-[var(--ds-color-control-primary-elevate)]
                  disabled:bg-[var(--ds-color-control-primary-disabled)]
                  `,
        },
        {
          variant: 'secondary',
          color: 'primary',
          class: `
                  bg-light-200
                  text-[var(--ds-color-primitive-grey-800)]
                  
                  hover:bg-[var(--ds-color-control-secondary-hover)]
                  hover:[color:var(--ds-color-fg-secondary-hover)]
                  
                  active:bg-[var(--ds-color-control-secondary-active)]
                  active:text-[var(--ds-color-primitive-grey-800)]
                  
                  disabled:[color-var(--ds-color-fg-quartenary)]
                  disabled:bg-[var(--ds-color-control-secondary-disabled)]
                  `,
        },
        {
          variant: 'primary',
          color: 'secondary',
          class: `
                  border 
                  border-(--ds-color-border-secondary)
                  bg-(--ds-color-bg-primary)
                  text-[var(--ds-color-primitive-grey-800)]
                  
                  hover:bg-(--ds-color-control-secondary-hover)
                  hover:text-(--ds-color-fg-secondary-hover)
                  
                  active:bg-(--ds-color-control-secondary-active)
                  active:text-(--ds-color-primitive-grey-800)
                  
                  disabled:color-(--ds-color-fg-quartenary)
                  disabled:bg-(--ds-color-control-secondary-disabled)
                  `,
          active: false,
        },
        {
          variant: 'primary',
          color: 'secondary',
          class: `
                  border 
                  border-(--ds-color-border-secondary)
                  bg-(--ds-color-control-secondary-active)
                  text-(--ds-color-primitive-grey-800)
                  `,
          active: true,
        },
        {
          variant: 'primary',
          color: 'text',
        },
        {
          variant: 'primary',
          color: 'quaternary',
          class: `
                  bg-(--ds-color-primitive-brand-50)
                  
                  border-2
                  border-(--ds-color-primitive-light-100)
                  
                  text-(--ds-color-brand-default)
                  hover:text-(--ds-color-brand-hover)
                  active:text-(--ds-color-brand-active)
                  `,
        },
        {
          variant: 'tertiary',
          color: 'text',
          class: `
                  bg-[var(--ds-color-primitive-brand-100)]
                  hover:bg-[var(--ds-color-primitive-brand-150)]
                  active:bg-[var(--ds-color-primitive-brand-200)]
                  disabled:bg-[var(--ds-color-primitive-brand-100)]
                  
                  hover:text-[var(--ds-color-primitive-brand-600)]
                  
                  text-[var(--ds-color-primitive-brand-500)]
                  hover:text-[var(--ds-color-primitive-brand-500)]
                  active:text-[var(--ds-color-primitive-brand-500)]
                  disabled:text-[var(--ds-color-brand-light)]
                  `,
        },
        {
          size: 'sm',
          square: true,
          class: 'p-[7px]',
        },
        {
          size: 'md',
          square: true,
          class: {
            base: 'p-3',
            leadingIcon: 'size-3.5',
          },
        },
        {
          size: 'xl',
          square: true,
          class: 'p-[18px]',
        },
      ],
      defaultVariants: {
        color: 'primary',
        variant: 'primary',
        size: 'xl',
      },
    },
    toast: {
      slots: {
        root: 'relative group overflow-hidden bg-default shadow-lg rounded-lg ring ring-default p-4 flex gap-2.5 focus:outline-none',
        wrapper: 'w-0 flex-1 flex flex-col',
        title: 'text-sm font-medium text-highlighted',
        description: 'text-sm text-muted',
        icon: 'shrink-0 size-5',
        avatar: 'shrink-0',
        avatarSize: '2xl',
        actions: 'flex gap-1.5 shrink-0',
        progress: 'absolute inset-x-0 bottom-0',
        close: 'p-0',
      },
      variants: {
        color: {
          primary: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
            icon: 'text-primary',
          },
          secondary: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary',
            icon: 'text-secondary',
          },
          success: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error bg-(--ds-color-primitive-brand-50)',
            title: 'semibold text-(--ds-color-primitive-green-700)',
            description: 'text-(--ds-color-fg-primary)',
            icon: 'text-success',
          },
          info: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error bg-(--ds-color-primitive-brand-50)',
            title: 'semibold text-(--ds-color-primitive-blue-600)',
            description: 'text-(--ds-color-fg-primary)',
            icon: 'text-info',
          },
          warning: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning',
            icon: 'text-warning',
          },
          error: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error bg-(--ds-color-sentiment-negative-bg)',
            wrapper: '',
            title: 'semibold text-(--ds-color-fg-primary)',
            description: 'text-(--ds-color-fg-primary)',
            icon: 'text-error',
          },
          neutral: {
            root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted',
            icon: 'text-highlighted',
          },
        },
        orientation: {
          horizontal: {
            root: 'items-center',
            actions: 'items-center',
          },
          vertical: {
            root: 'items-start',
            actions: 'items-start mt-2.5',
          },
        },
        title: {
          true: {
            description: 'mt-1',
          },
        },
      },
      defaultVariants: {
        color: 'primary',
      },
    },
    tailwind: {
      safelist: [ // необходимо для отключения оптимизации. Иначе переменные цветов не будут доступны динамически
        'bg-amber-100',
        'bg-amber-200',
        'bg-amber-300',
        'bg-amber-400',
        'bg-amber-50',
        'bg-amber-500',
        'bg-amber-600',
        'bg-amber-700',
        'bg-amber-800',
        'bg-amber-900',
        'bg-black',
        'bg-blue-100',
        'bg-blue-200',
        'bg-blue-300',
        'bg-blue-400',
        'bg-blue-50',
        'bg-blue-500',
        'bg-blue-600',
        'bg-blue-700',
        'bg-blue-800',
        'bg-blue-900',
        'bg-cyan-100',
        'bg-cyan-200',
        'bg-cyan-300',
        'bg-cyan-400',
        'bg-cyan-50',
        'bg-cyan-500',
        'bg-cyan-600',
        'bg-cyan-700',
        'bg-cyan-800',
        'bg-cyan-900',
        'bg-emerald-100',
        'bg-emerald-200',
        'bg-emerald-300',
        'bg-emerald-400',
        'bg-emerald-50',
        'bg-emerald-500',
        'bg-emerald-600',
        'bg-emerald-700',
        'bg-emerald-800',
        'bg-emerald-900',
        'bg-fuchsia-100',
        'bg-fuchsia-200',
        'bg-fuchsia-300',
        'bg-fuchsia-400',
        'bg-fuchsia-50',
        'bg-fuchsia-500',
        'bg-fuchsia-600',
        'bg-fuchsia-700',
        'bg-fuchsia-800',
        'bg-fuchsia-900',
        'bg-gray-100',
        'bg-gray-200',
        'bg-gray-300',
        'bg-gray-400',
        'bg-gray-50',
        'bg-gray-500',
        'bg-gray-600',
        'bg-gray-700',
        'bg-gray-800',
        'bg-gray-900',
        'bg-green-100',
        'bg-green-200',
        'bg-green-300',
        'bg-green-400',
        'bg-green-50',
        'bg-green-500',
        'bg-green-600',
        'bg-green-700',
        'bg-green-800',
        'bg-green-900',
        'bg-indigo-100',
        'bg-indigo-200',
        'bg-indigo-300',
        'bg-indigo-400',
        'bg-indigo-50',
        'bg-indigo-500',
        'bg-indigo-600',
        'bg-indigo-700',
        'bg-indigo-800',
        'bg-indigo-900',
        'bg-lime-100',
        'bg-lime-200',
        'bg-lime-300',
        'bg-lime-400',
        'bg-lime-50',
        'bg-lime-500',
        'bg-lime-600',
        'bg-lime-700',
        'bg-lime-800',
        'bg-lime-900',
        'bg-neutral-100',
        'bg-neutral-200',
        'bg-neutral-300',
        'bg-neutral-400',
        'bg-neutral-50',
        'bg-neutral-500',
        'bg-neutral-600',
        'bg-neutral-700',
        'bg-neutral-800',
        'bg-neutral-900',
        'bg-orange-100',
        'bg-orange-200',
        'bg-orange-300',
        'bg-orange-400',
        'bg-orange-50',
        'bg-orange-500',
        'bg-orange-600',
        'bg-orange-700',
        'bg-orange-800',
        'bg-orange-900',
        'bg-pink-100',
        'bg-pink-200',
        'bg-pink-300',
        'bg-pink-400',
        'bg-pink-50',
        'bg-pink-500',
        'bg-pink-600',
        'bg-pink-700',
        'bg-pink-800',
        'bg-pink-900',
        'bg-purple-100',
        'bg-purple-200',
        'bg-purple-300',
        'bg-purple-400',
        'bg-purple-50',
        'bg-purple-500',
        'bg-purple-600',
        'bg-purple-700',
        'bg-purple-800',
        'bg-purple-900',
        'bg-red-100',
        'bg-red-200',
        'bg-red-300',
        'bg-red-400',
        'bg-red-50',
        'bg-red-500',
        'bg-red-600',
        'bg-red-700',
        'bg-red-800',
        'bg-red-900',
        'bg-rose-100',
        'bg-rose-200',
        'bg-rose-300',
        'bg-rose-400',
        'bg-rose-50',
        'bg-rose-500',
        'bg-rose-600',
        'bg-rose-700',
        'bg-rose-800',
        'bg-rose-900',
        'bg-sky-100',
        'bg-sky-200',
        'bg-sky-300',
        'bg-sky-400',
        'bg-sky-50',
        'bg-sky-500',
        'bg-sky-600',
        'bg-sky-700',
        'bg-sky-800',
        'bg-sky-900',
        'bg-slate-100',
        'bg-slate-200',
        'bg-slate-300',
        'bg-slate-400',
        'bg-slate-50',
        'bg-slate-500',
        'bg-slate-600',
        'bg-slate-700',
        'bg-slate-800',
        'bg-slate-900',
        'bg-stone-100',
        'bg-stone-200',
        'bg-stone-300',
        'bg-stone-400',
        'bg-stone-50',
        'bg-stone-500',
        'bg-stone-600',
        'bg-stone-700',
        'bg-stone-800',
        'bg-stone-900',
        'bg-teal-100',
        'bg-teal-200',
        'bg-teal-300',
        'bg-teal-400',
        'bg-teal-50',
        'bg-teal-500',
        'bg-teal-600',
        'bg-teal-700',
        'bg-teal-800',
        'bg-teal-900',
        'bg-violet-100',
        'bg-violet-200',
        'bg-violet-300',
        'bg-violet-400',
        'bg-violet-50',
        'bg-violet-500',
        'bg-violet-600',
        'bg-violet-700',
        'bg-violet-800',
        'bg-violet-900',
        'bg-white',
        'bg-yellow-100',
        'bg-yellow-200',
        'bg-yellow-300',
        'bg-yellow-400',
        'bg-yellow-50',
        'bg-yellow-500',
        'bg-yellow-600',
        'bg-yellow-700',
        'bg-yellow-800',
        'bg-yellow-900',
        'bg-zinc-100',
        'bg-zinc-200',
        'bg-zinc-300',
        'bg-zinc-400',
        'bg-zinc-50',
        'bg-zinc-500',
        'bg-zinc-600',
        'bg-zinc-700',
        'bg-zinc-800',
        'bg-zinc-900',
        'text-amber-100',
        'text-amber-200',
        'text-amber-300',
        'text-amber-400',
        'text-amber-50',
        'text-amber-500',
        'text-amber-600',
        'text-amber-700',
        'text-amber-800',
        'text-amber-900',
        'text-black',
        'text-blue-100',
        'text-blue-200',
        'text-blue-300',
        'text-blue-400',
        'text-blue-50',
        'text-blue-500',
        'text-blue-600',
        'text-blue-700',
        'text-blue-800',
        'text-blue-900',
        'text-cyan-100',
        'text-cyan-200',
        'text-cyan-300',
        'text-cyan-400',
        'text-cyan-50',
        'text-cyan-500',
        'text-cyan-600',
        'text-cyan-700',
        'text-cyan-800',
        'text-cyan-900',
        'text-emerald-100',
        'text-emerald-200',
        'text-emerald-300',
        'text-emerald-400',
        'text-emerald-50',
        'text-emerald-500',
        'text-emerald-600',
        'text-emerald-700',
        'text-emerald-800',
        'text-emerald-900',
        'text-fuchsia-100',
        'text-fuchsia-200',
        'text-fuchsia-300',
        'text-fuchsia-400',
        'text-fuchsia-50',
        'text-fuchsia-500',
        'text-fuchsia-600',
        'text-fuchsia-700',
        'text-fuchsia-800',
        'text-fuchsia-900',
        'text-gray-100',
        'text-gray-200',
        'text-gray-300',
        'text-gray-400',
        'text-gray-50',
        'text-gray-500',
        'text-gray-600',
        'text-gray-700',
        'text-gray-800',
        'text-gray-900',
        'text-green-100',
        'text-green-200',
        'text-green-300',
        'text-green-400',
        'text-green-50',
        'text-green-500',
        'text-green-600',
        'text-green-700',
        'text-green-800',
        'text-green-900',
        'text-indigo-100',
        'text-indigo-200',
        'text-indigo-300',
        'text-indigo-400',
        'text-indigo-50',
        'text-indigo-500',
        'text-indigo-600',
        'text-indigo-700',
        'text-indigo-800',
        'text-indigo-900',
        'text-lime-100',
        'text-lime-200',
        'text-lime-300',
        'text-lime-400',
        'text-lime-50',
        'text-lime-500',
        'text-lime-600',
        'text-lime-700',
        'text-lime-800',
        'text-lime-900',
        'text-neutral-100',
        'text-neutral-200',
        'text-neutral-300',
        'text-neutral-400',
        'text-neutral-50',
        'text-neutral-500',
        'text-neutral-600',
        'text-neutral-700',
        'text-neutral-800',
        'text-neutral-900',
        'text-orange-100',
        'text-orange-200',
        'text-orange-300',
        'text-orange-400',
        'text-orange-50',
        'text-orange-500',
        'text-orange-600',
        'text-orange-700',
        'text-orange-800',
        'text-orange-900',
        'text-pink-100',
        'text-pink-200',
        'text-pink-300',
        'text-pink-400',
        'text-pink-50',
        'text-pink-500',
        'text-pink-600',
        'text-pink-700',
        'text-pink-800',
        'text-pink-900',
        'text-purple-100',
        'text-purple-200',
        'text-purple-300',
        'text-purple-400',
        'text-purple-50',
        'text-purple-500',
        'text-purple-600',
        'text-purple-700',
        'text-purple-800',
        'text-purple-900',
        'text-red-100',
        'text-red-200',
        'text-red-300',
        'text-red-400',
        'text-red-50',
        'text-red-500',
        'text-red-600',
        'text-red-700',
        'text-red-800',
        'text-red-900',
        'text-rose-100',
        'text-rose-200',
        'text-rose-300',
        'text-rose-400',
        'text-rose-50',
        'text-rose-500',
        'text-rose-600',
        'text-rose-700',
        'text-rose-800',
        'text-rose-900',
        'text-sky-100',
        'text-sky-200',
        'text-sky-300',
        'text-sky-400',
        'text-sky-50',
        'text-sky-500',
        'text-sky-600',
        'text-sky-700',
        'text-sky-800',
        'text-sky-900',
        'text-slate-100',
        'text-slate-200',
        'text-slate-300',
        'text-slate-400',
        'text-slate-50',
        'text-slate-500',
        'text-slate-600',
        'text-slate-700',
        'text-slate-800',
        'text-slate-900',
        'text-stone-100',
        'text-stone-200',
        'text-stone-300',
        'text-stone-400',
        'text-stone-50',
        'text-stone-500',
        'text-stone-600',
        'text-stone-700',
        'text-stone-800',
        'text-stone-900',
        'text-teal-100',
        'text-teal-200',
        'text-teal-300',
        'text-teal-400',
        'text-teal-50',
        'text-teal-500',
        'text-teal-600',
        'text-teal-700',
        'text-teal-800',
        'text-teal-900',
        'text-violet-100',
        'text-violet-200',
        'text-violet-300',
        'text-violet-400',
        'text-violet-50',
        'text-violet-500',
        'text-violet-600',
        'text-violet-700',
        'text-violet-800',
        'text-violet-900',
        'text-white',
        'text-yellow-100',
        'text-yellow-200',
        'text-yellow-300',
        'text-yellow-400',
        'text-yellow-50',
        'text-yellow-500',
        'text-yellow-600',
        'text-yellow-700',
        'text-yellow-800',
        'text-yellow-900',
        'text-zinc-100',
        'text-zinc-200',
        'text-zinc-300',
        'text-zinc-400',
        'text-zinc-50',
        'text-zinc-500',
        'text-zinc-600',
        'text-zinc-700',
        'text-zinc-800',
        'text-zinc-900',
      ],
    },

    separator: {
      slots: {
        container: 'text-sm',
        label: 'font-normal',
      },
      variants: {
        color: {
          neutral: {
            border: 'border-black',
          },
        },
      },
    },
    table: {
      slots: {
        root: 'relative bg-(--ds-color-primitive-light-100)',
        base: 'min-w-full',
        caption: 'sr-only',
        thead: 'relative',
        tbody: 'divide-y divide-default [&>tr]:data-[selectable=true]:hover:bg-(--ds-color-bg-primary) [&>tr]:data-[selectable=true]:focus-visible:outline-primary',
        tfoot: 'relative',
        tr: 'data-[selected=true]:bg-(--ds-color-bg-primary)',
        th: 'px-4 py-3.5 text-sm text-[var(--ds-color-primitive-grey-800)] text-left rtl:text-right font-semibold [&:has([role=checkbox])]:pe-0',
        td: '',
        separator: 'absolute z-[1] left-0 w-full h-px bg-(--ui-border-accented)',
        empty: 'hidden p-0 pt-[1px] text-center text-sm text-muted',
        loading: 'py-6 text-center',
      },
      variants: {
        virtualize: {
          false: {
            base: 'overflow-visible',
            tbody: 'divide-y divide-default',
          },
        },
        pinned: {
          true: {
            tr: 'data-[selectable=true]:hover:[&_td]:bg-(--ds-color-bg-primary) data-[selectable=true]:focus-visible:[&_td]:outline-primary data-[selected=true]:[&_td]:bg-(--ds-color-bg-primary)',
            th: 'sticky z-2',
            td: 'sticky z-1',
          },
        },
        sticky: {
          true: {
            thead: 'sticky top-0 inset-x-0 bg-(--ds-color-primitive-light-200) backdrop-blur z-2',
            th: 'bg-light-200',
            td: 'bg-light-100',
            tr: 'data-[selectable=true]:hover:[&_td]:bg-(--ds-color-bg-primary) data-[selectable=true]:focus-visible:[&_td]:outline-primary data-[selected=true]:[&_td]:bg-(--ds-color-bg-primary)',
            tfoot: 'sticky bottom-0 inset-x-0 bg-default/75 backdrop-blur z-1',
          },
          header: {
            thead: 'sticky top-0 inset-x-0 bg-default/75 backdrop-blur z-1',
          },
          footer: {
            tfoot: 'sticky bottom-0 inset-x-0 bg-default/75 backdrop-blur z-1',
          },
        },
        loadingColor: {
          primary: {
            loading: '',
          },
        },
      },
      compoundVariants: [
        {
          loading: true,
          loadingColor: 'primary',
          class: {
            thead: 'after:bg-(--ds-color-brand-default)',
          },
        },
      ],
      defaultVariants: {
        loadingColor: 'primary',
        loadingAnimation: 'swing',
        sticky: true,
      },
    },
    checkbox: {
      slots: {
        indicator: 'text-[var(--ds-color-primitive-light-100)] !bg-[var(--ds-color-primitive-brand-500)] !hover:bg-[var(--ds-color-primitive-brand-600)]',
      },
    },
    switch: {
      slots: {
        base: 'data-[state=checked]:!bg-[var(--ds-color-primitive-brand-500)] !bg-[var(--ds-color-primitive-light-600)]',
        thumb: 'bg-[var(--ds-color-primitive-light-100)]',
      },
    },
    tooltip: {
      slots: {
        content: 'shadow-[0_1px_4px_0_rgba(0,0,0,0.05),0_8px_16px_-3px_rgba(0,0,0,0.08)] text-(--ds-color-fg-primary) bg-(--ds-color-bg-primary) rounded-[10px] px-3 py-2 border-0.5 border-(--ds-color-border-secondary) h-auto',
        arrow: 'fill-default',
        text: 'text-sm whitespace-normal',
      },
    },
    dropdownMenu: {
      slots: {
        content: 'bg-white rounded-2xl',
        itemLabel: 'font-semibold',
        item: 'before:inset-0 before:rounded-none',
        group: 'p-0',
        viewport: 'max-h-50 scrollbarList',
      },
      variants: {
        color: {
          primary: {
            itemLabel: 'text-(--ds-color-fg-primary) data-highlighted:text-(--ds-color-fg-primary-hover)',
            label: 'data-highlighted:text-(--ds-color-fg-primary-hover)',
            item: 'data-highlighted:text-(--ds-color-fg-primary-hover) data-highlighted:before:bg-(--ds-color-primitive-light-300)',
          },
          error: {
            itemLabel: 'text-(--ds-color-primitive-red-700)',
            itemLeadingIcon: 'text-(--ds-color-primitive-red-600)',
          },
        },
        size: {
          md: {
            item: 'p-3',
            itemLeadingIcon: 'size-4',
          },
        },
        active: {
          true: {},
          false: {},
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          active: false,
          class: {
            item: 'data-highlighted:text-(--ds-color-fg-primary-hover) data-highlighted:before:bg-(--ds-color-primitive-light-300)',
          },
        },
        {
          color: 'error',
          active: false,
          class: {
            item: 'data-highlighted:text-(--ds-color-sentiment-negative-fg-hover) data-highlighted:before:bg-(--ds-color-primitive-light-300)',
          },
        },
        {
          color: 'primary',
          active: true,
          class: {
            item: 'data-highlighted:text-(--ds-color-fg-primary-hover) data-highlighted:before:bg-(--ds-color-bg-tertiary)',
          },
        },
        {
          color: 'error',
          active: true,
          class: {
            item: 'data-highlighted:text-(--ds-color-sentiment-negative-fg-hover) data-highlighted:before:bg-(--ds-color-bg-tertiary)',
          },
        },
      ],
      defaultVariants: {
        color: 'primary',
        size: 'md',
      },
    },
    empty: {
      slots: {
        root: 'relative flex flex-col items-center justify-center gap-4 rounded-none p-4 sm:p-6 lg:p-8 min-w-0 border-0',
        header: 'flex flex-col items-center gap-2 max-w-sm text-center',
        avatar: 'shrink-0 mb-2',
        title: 'text-highlighted text-pretty font-medium',
        description: 'text-balance text-center',
        body: 'flex flex-col items-center gap-4 max-w-sm',
        actions: 'flex flex-wrap justify-center gap-2 shrink-0',
        footer: 'flex flex-col items-center gap-2 max-w-sm',
      },
      variants: {
        size: {
          xs: {
            avatar: 'size-8 text-base',
            title: 'text-sm',
            description: 'text-xs',
          },
          sm: {
            avatar: 'size-9 text-lg',
            title: 'text-sm',
            description: 'text-xs',
          },
          md: {
            avatar: 'size-10 text-xl',
            title: 'text-base',
            description: 'text-sm',
          },
          lg: {
            avatar: 'size-11 text-[22px]',
            title: 'text-base',
            description: 'text-sm',
          },
          xl: {
            avatar: 'size-12 text-2xl',
            title: 'text-lg',
            description: 'text-base',
          },
        },
        variant: {
          solid: {
            root: 'bg-inverted',
            title: 'text-inverted',
            description: 'text-dimmed',
          },
          outline: {
            root: 'bg-default ring-0',
            description: 'text-muted',
            body: 'text-(--ds-color-fg-quaternary)',
          },
          soft: {
            root: 'bg-elevated/50',
            description: 'text-toned',
          },
          subtle: {
            root: 'bg-elevated/50 ring ring-default',
            description: 'text-toned',
          },
          naked: {
            description: 'text-muted',
          },
        },
      },
      defaultVariants: {
        variant: 'outline',
        size: 'md',
      },
    },
    popover: {
      slots: {
        content: `
        !bg-light-100 
        shadow-lg 
        rounded-2xl 
        ring 
        ring-default 
        data-[state=open]:animate-[scale-in_100ms_ease-out] 
        data-[state=closed]:animate-[scale-out_100ms_ease-in] 
        origin-(--reka-popover-content-transform-origin) 
        focus:outline-none 
        pointer-events-auto`,
        arrow: 'fill-default',
      },
    },
    calendar: {
      slots: {
        root: 'bg-light-100 rounded-2xl p-4',
        header: 'flex items-center justify-between text-sm',
        heading: 'text-center font-medium truncate mx-auto',
        body: `
        group
        flex 
        flex-col 
        space-y-4 
        pt-4 
        sm:flex-row 
        sm:space-x-4 
        sm:space-y-0`,
        grid: 'w-full border-collapse select-none space-y-1 focus:outline-none',
        gridRow: 'grid gap-0 grid-cols-7 place-items-center',
        gridWeekDaysRow: 'mb-1 grid w-full grid-cols-7',
        gridBody: 'grid',
        headCell: 'rounded-md',
        headCellWeek: 'rounded-md text-muted',
        cell: 'relative text-center',
        cellTrigger: [
          `
          m-0 
          relative 
          flex 
          font-semibold
          items-center 
          justify-center 
          rounded-none
          
          data-[highlighted-end]:rounded-r-full
          data-[highlighted-start]:rounded-l-full
          
          group-[:not(:has([data-highlighted-end]))]:data-[selection-start]:rounded-l-full
          group-[:not(:has([data-highlighted-start]))]:data-[selection-end]:rounded-r-full
          
          whitespace-nowrap 
          focus-visible:ring-2 
          focus:outline-none 
          data-disabled:text-muted 
          data-unavailable:line-through 
          data-unavailable:text-muted 
          data-unavailable:pointer-events-none 
          data-today:font-semibold 
          data-[outside-view]:text-muted
          data-[outside-view]:hidden
          `,
          'transition',
          'text-xs',
        ],
        cellWeek: 'relative text-center text-muted',
      },
      variants: {
        color: {
          primary: {
            headCell: 'text-primary',
            cellTrigger: 'focus-visible:ring-primary',
          },
          secondary: {
            headCell: 'text-secondary',
            cellTrigger: 'focus-visible:ring-secondary',
          },
          success: {
            headCell: 'text-success',
            cellTrigger: 'focus-visible:ring-success',
          },
          info: {
            headCell: 'text-info',
            cellTrigger: 'focus-visible:ring-info',
          },
          warning: {
            headCell: 'text-warning',
            cellTrigger: 'focus-visible:ring-warning',
          },
          error: {
            headCell: 'text-error',
            cellTrigger: 'focus-visible:ring-error',
          },
          neutral: {
            headCell: 'text-highlighted',
            cellTrigger: 'focus-visible:ring-inverted',
          },
        },
        variant: {
          solid: '',
          outline: '',
          soft: '',
          subtle: '',
        },
        size: {
          xs: {
            heading: 'text-xs',
            cell: 'text-xs',
            cellWeek: 'text-xs',
            headCell: 'text-[10px]',
            headCellWeek: 'text-[10px]',
            cellTrigger: 'size-7',
            body: 'space-y-2 pt-2',
          },
          sm: {
            heading: 'text-xs',
            headCell: 'text-xs',
            headCellWeek: 'text-xs',
            cellWeek: 'text-xs',
            cell: 'text-xs',
            cellTrigger: 'size-7',
          },
          md: {
            heading: 'text-sm',
            headCell: 'text-xs',
            headCellWeek: 'text-xs',
            cellWeek: 'text-xs',
            cell: 'text-sm w-full h-full',
            cellTrigger: 'w-full h-11',
          },
          lg: {
            heading: 'text-md',
            headCell: 'text-md',
            headCellWeek: 'text-md',
            cellTrigger: 'size-9 text-md',
          },
          xl: {
            heading: 'text-lg',
            headCell: 'text-lg',
            headCellWeek: 'text-lg',
            cellTrigger: 'size-10 text-lg',
          },
        },
        weekNumbers: {
          true: {
            gridRow: 'grid-cols-8',
            gridWeekDaysRow: 'grid-cols-8 [&>*:first-child]:col-start-2',
          },
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class: {
            heading: 'text-sm font-semibold text-(--ds-color-fg-primary)',
            headCell: 'text-xs font-medium text-(--ds-color-fg-tertiary)',
            cellTrigger: `
            text-sm 
            text-(--ds-color-fg-primary) 
            
            data-[selection-start]:bg-(--ds-color-brand-default) 
            data-[selection-start]:text-white
            
            data-[selection-end]:bg-(--ds-color-brand-default) 
            data-[selection-end]:text-white
            
            data-[selected]:bg-(--ds-color-primitive-brand-50)
            data-[selected]:text-(--ds-color-brand-default) 
            
            data-[highlighted]:bg-(--ds-color-primitive-brand-100)
            data-[highlighted]:hover:bg-(--ds-color-primitive-brand-100)
            hover:not-data-[selected]:bg-(--ds-color-control-secondary-hover)
            
            not-data-[selected]:rounded-full
            data-[highlighted]:rounded-none
            `,
          },
        },
        {
          color: 'primary',
          variant: 'outline',
          class: {
            cellTrigger: `
            data-[selected]:ring 
            data-[selected]:ring-inset 
            data-[selected]:ring-primary/50 
            data-[selected]:text-primary 
            data-today:not-data-[selected]:text-primary 
            data-[highlighted]:bg-primary/10 
            hover:not-data-[selected]:bg-(--ds-color-control-secondary-hover)`,
          },
        },
        {
          color: 'primary',
          variant: 'soft',
          class: {
            cellTrigger: 'data-[selected]:bg-primary/10 data-[selected]:text-primary data-today:not-data-[selected]:text-primary data-[highlighted]:bg-primary/20 hover:not-data-[selected]:bg-primary/20',
          },
        },
        {
          color: 'primary',
          variant: 'subtle',
          class: {
            cellTrigger: 'data-[selected]:bg-primary/10 data-[selected]:text-primary data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-primary/25 data-today:not-data-[selected]:text-primary data-[highlighted]:bg-primary/20 hover:not-data-[selected]:bg-primary/20',
          },
        },
        {
          color: 'neutral',
          variant: 'solid',
          class: {
            cellTrigger: 'data-[selected]:bg-inverted data-[selected]:text-inverted data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-data-[selected]:bg-inverted/10',
          },
        },
        {
          color: 'neutral',
          variant: 'outline',
          class: {
            cellTrigger: 'data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-accented data-[selected]:text-default data-[selected]:bg-default data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/10 hover:not-data-[selected]:bg-inverted/10',
          },
        },
        {
          color: 'neutral',
          variant: 'soft',
          class: {
            cellTrigger: 'data-[selected]:bg-elevated data-[selected]:text-default data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-data-[selected]:bg-inverted/10',
          },
        },
        {
          color: 'neutral',
          variant: 'subtle',
          class: {
            cellTrigger: 'data-[selected]:bg-elevated data-[selected]:text-default data-[selected]:ring data-[selected]:ring-inset data-[selected]:ring-accented data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-data-[selected]:bg-inverted/10',
          },
        },
      ],
      defaultVariants: {
        size: 'md',
        color: 'primary',
        variant: 'solid',
      },
    },
    chip: {
      slots: {
        root: 'relative inline-flex items-center justify-center shrink-0',
        base: 'rounded-full ring ring-bg flex items-center justify-center text-inverted font-medium whitespace-nowrap',
      },
      variants: {
        color: {
          primary: 'bg-brand-500 ring-0',
          secondary: 'bg-secondary',
          success: 'bg-success',
          info: 'bg-info',
          warning: 'bg-warning',
          error: 'bg-error',
          neutral: 'bg-inverted',
        },
        size: {
          '3xs': 'h-[4px] min-w-[4px] text-[4px]',
          '2xs': 'h-[5px] min-w-[5px] text-[5px]',
          'xs': 'h-[6px] min-w-[6px] text-[6px]',
          'sm': 'h-[7px] min-w-[7px] text-[7px]',
          'md': 'h-[8px] min-w-[8px] text-[8px]',
          'lg': 'h-[9px] min-w-[9px] text-[9px]',
          'xl': 'h-[10px] min-w-[10px] text-[10px]',
          '2xl': 'h-[11px] min-w-[11px] text-[11px]',
          '3xl': 'h-[12px] min-w-[12px] text-[12px]',
        },
        position: {
          'top-right': 'top-0 right-0',
          'bottom-right': 'bottom-0 right-0',
          'top-left': 'top-0 left-0',
          'bottom-left': 'bottom-0 left-0',
          'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
        },
        inset: {
          false: '',
        },
        standalone: {
          false: 'absolute',
        },
      },
      compoundVariants: [
        {
          position: 'top-right',
          inset: false,
          class: '-translate-y-1/2 translate-x-1/2 transform',
        },
        {
          position: 'bottom-right',
          inset: false,
          class: 'translate-y-1/2 translate-x-1/2 transform',
        },
        {
          position: 'top-left',
          inset: false,
          class: '-translate-y-1/2 -translate-x-1/2 transform',
        },
        {
          position: 'bottom-left',
          inset: false,
          class: 'translate-y-1/2 -translate-x-1/2 transform',
        },
      ],
      defaultVariants: {
        size: 'md',
        color: 'primary',
        position: 'top-right',
      },
    },
    badge: {
      slots: {
        base: 'font-medium inline-flex items-center',
        label: 'truncate',
        leadingIcon: 'shrink-0',
        leadingAvatar: 'shrink-0',
        leadingAvatarSize: '',
        trailingIcon: 'shrink-0',
      },
      variants: {
        fieldGroup: {
          horizontal: 'not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]',
          vertical: 'not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]',
        },
        color: {
          primary: '',
          secondary: '',
          success: '',
          info: '',
          warning: '',
          error: '',
          neutral: '',
        },
        variant: {
          solid: '',
          outline: '',
          soft: '',
          subtle: '',
        },
        size: {
          xs: {
            base: 'text-[8px]/3 px-1 py-0.5 gap-1 rounded-sm',
            leadingIcon: 'size-3',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-3',
          },
          sm: {
            base: 'text-[10px]/3 px-1.5 py-1 gap-1 rounded-sm',
            leadingIcon: 'size-3',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-3',
          },
          md: {
            base: 'text-xs px-2 py-1 gap-1 rounded-full',
            leadingIcon: 'size-2.5',
            leadingAvatarSize: '3xs',
            trailingIcon: 'size-2.5',
          },
          lg: {
            base: 'text-sm px-2 py-1 gap-1.5 rounded-md',
            leadingIcon: 'size-5',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-5',
          },
          xl: {
            base: 'text-base px-2.5 py-1 gap-1.5 rounded-md',
            leadingIcon: 'size-6',
            leadingAvatarSize: '2xs',
            trailingIcon: 'size-6',
          },
        },
        square: {
          true: '',
        },
      },
      compoundVariants: [
        {
          color: 'primary',
          variant: 'solid',
          class: 'bg-(--ds-color-primitive-brand-500) text-(--ds-color-fg-brand-primary)',
        },
        {
          color: 'secondary',
          variant: 'solid',
          class: 'bg-primary text-inverted',
        },
        {
          color: 'primary',
          variant: 'outline',
          class: 'text-primary ring ring-inset ring-primary/50',
        },
        {
          color: 'primary',
          variant: 'soft',
          class: 'bg-primary/10 text-primary',
        },
        {
          color: 'primary',
          variant: 'subtle',
          class: 'bg-primary/10 text-primary ring ring-inset ring-primary/25',
        },
        {
          color: 'neutral',
          variant: 'solid',
          class: 'text-inverted bg-inverted',
        },
        {
          color: 'neutral',
          variant: 'outline',
          class: 'ring ring-inset ring-accented text-default bg-default',
        },
        {
          color: 'neutral',
          variant: 'soft',
          class: 'text-default bg-elevated',
        },
        {
          color: 'neutral',
          variant: 'subtle',
          class: 'ring ring-inset ring-accented text-default bg-elevated',
        },
        {
          size: 'xs',
          square: true,
          class: 'p-0.5',
        },
        {
          size: 'sm',
          square: true,
          class: 'p-1',
        },
        {
          size: 'md',
          square: true,
          class: 'p-1',
        },
        {
          size: 'lg',
          square: true,
          class: 'p-1',
        },
        {
          size: 'xl',
          square: true,
          class: 'p-1',
        },
      ],
      defaultVariants: {
        color: 'primary',
        variant: 'solid',
        size: 'md',
      },
    },
    alert: {
      slots: {
        root: 'relative overflow-hidden w-full border rounded-2xl py-3 px-4 flex gap-3 !max-w-87.5',
        wrapper: 'min-w-0 flex-1 flex flex-col',
        title: 'text-sm font-medium',
        description: 'text-sm font-medium',
        icon: 'shrink-0 size-4',
        avatar: 'shrink-0',
        avatarSize: '2xl',
        actions: 'flex flex-wrap gap-1.5 shrink-0',
        close: 'p-0',
      },
      variants: {
        color: {
          primary: '',
          secondary: {
            description: `text-(--ds-color-fg-secondary)`,
          },
          success: {
            description: `text-(--ds-color-fg-primary)`,
          },
          info: {
            description: `text-(--ds-color-fg-primary)`,
          },
          warning: {
            description: `text-(--ds-color-fg-primary)`,
          },
          error: {
            description: `text-(--ds-color-fg-primary)`,
          },
          neutral: '',
        },
        variant: {
          solid: '',
          outline: '',
          soft: '',
          subtle: '',
        },
        orientation: {
          horizontal: {
            root: 'items-center',
            actions: 'items-center',
          },
          vertical: {
            root: 'items-start',
            actions: 'items-start mt-2.5',
          },
        },
        title: {
          true: {
            description: 'mt-1',
          },
        },
      },
      compoundVariants: [
        {
          variant: 'primary',
          color: 'info',
          class: {
            root: `bg-(--ds-color-primitive-blue-100) border-(--ds-color-primitive-blue-200)`,
            icon: `text-(--ds-color-sentiment-informative-defalut)`,
          },
        },
        {
          variant: 'primary',
          color: 'success',
          class: {
            root: `bg-(--ds-color-sentiment-positive-bg) border-(--ds-color-primitive-green-200)`,
            icon: `text-(--ds-color-sentiment-positive-defalut)`,
          },
        },
        {
          variant: 'primary',
          color: 'error',
          class: {
            root: `bg-(--ds-color-sentiment-negative-bg) border-(--ds-color-sentiment-negative-fg-tint)`,
            icon: `text-(--ds-color-sentiment-negative-fg)`,
          },
        },
        {
          variant: 'primary',
          color: 'warning',
          class: {
            root: `bg-(--ds-color-sentiment-warning-bg) border-(--ds-color-sentiment-warning-defalut)`,
            icon: `text-(--ds-color-sentiment-warning-defalut)`,
          },
        },
        {
          variant: 'primary',
          color: 'secondary',
          class: {
            root: `bg-white border-none`,
            icon: `text-(--ds-color-brand-light)`,
          },
        },
      ],
      defaultVariants: {
        variant: 'primary',
        color: 'info',
        orientation: 'horizontal',
      },
    },
    formField: {
      slots: {
        error: 'mt-2 pl-5 text-(--ds-color-primitive-red-700) text-xs leading-(--ds-typography-caption-s-line-height) font-(--ds-typography-caption-s-regular-font-weight) tracking-(--ds-typography-caption-s-letter-spacing)',
      },
    },
  },
})
