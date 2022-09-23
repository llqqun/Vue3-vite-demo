import { mount } from '@vue/test-utils'; // Vue 3 的组件测试工具
import Hello from '@/components/HelloWorld.vue';
import { add } from '@/utils';
import PromiseA from '@/utils/PromiseA';
/*
 *test: 定义了一组关于测试期望的方法。它接收测试名称和一个含有测试期望的函数
 expect: 用来创建断言
 toBeTruthy 会将检查值转换为布尔值，断言该值是否为 true
 toContain 用于断言检查值是否在数组中
 */
test('mount component', async () => {
  expect(Hello).toBeTruthy();

  const wrapper = mount(Hello, {
    props: {
      count: 4,
    },
  });

  expect(wrapper.text()).toContain('4 x 2 = 8');
  expect(wrapper.html()).toMatchSnapshot();

  await wrapper.get('button').trigger('click');

  expect(wrapper.text()).toContain('4 x 3 = 12');

  await wrapper.get('button').trigger('click');

  expect(wrapper.text()).toContain('4 x 4 = 16');
});

test('测试函数', () => {
  expect(add(2, 3)).toBe(5);
});
test('自定义PromiseA测试', () => {
  const p1 = new PromiseA((resolve: any) => {
    setTimeout(() => {
      resolve('ok');
    }, 1500);
  });
  expect(p1.status).toBe('pending');
  const p2 = p1.then((val: any) => {
    expect(p1.status).toBe('resolved');
    expect(val).toBe('ok');
  });
  console.log(p2);
});
