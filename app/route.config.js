import navConfig from './nav.config';

let route = [{
    path: '/',
    redirect: '/quickstart',
    component: require('./pages/component.vue'),
    meta: { auth: false },
    children: []
}];
const registerRoute = (config) => {
    config
    //require(`./docs/zh-cn${page.path}.md`)
    //require(`./docs/home.md`)
    function addRoute(page) {
        if (page.show == false) {
            return false;
        }
        let component = page.path === '/changelog' ? require('./pages/changelog.vue') : require(`./views/alert.vue`);
        if (page.path === '/edit') {
            component = require('./views/edit.vue');
        }
        let com = component.default || component;
        let child = {
            path: page.path.slice(1),
            meta: {
                title: page.title || page.name,
                description: page.description
            },
            component: com
        };
        route[0].children.push(child);
    }
    //if (config && config.length>0) {
    config.map(nav => {
        if (nav.groups) {
            nav.groups.map(group => {
                group.list.map(page => {
                    addRoute(page);
                });
            });
        } else if (nav.children) {
            nav.children.map(page => {
                addRoute(page);
            });
        } else {
            addRoute(nav);
        }
    });
    //}
    return { route, navs: config };
};

const myroute = registerRoute(navConfig);

let guideRoute = {
    path: '/guide',
    name: '指南',
    redirect: '/guide/design',
    component: require('./pages/guide.vue'),
    children: [{
        path: 'design',
        name: '设计原则',
        component: require('./pages/design.vue')
    }, {
        path: 'nav',
        name: '导航',
        component: require('./pages/nav.vue')
    }]
};

let resourceRoute = {
    path: '/resource',
    name: '资源',
    component: require('./pages/resource.vue')
};

let indexRoute = {
    path: '/',
    name: '首页',
    component: require('./pages/index.vue')
};


myroute.route = myroute.route.concat([indexRoute, guideRoute, resourceRoute]);

myroute.route.push({
    path: '/login',
    component: require('./pages/login.vue')
});

myroute.route.push({
    path: '*',
    component: require('./pages/404.vue')
});

export const navs = myroute.navs;
export default myroute.route;