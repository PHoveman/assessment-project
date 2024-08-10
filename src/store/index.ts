import { createClaim } from "@/core/createClaim";
import { getUserDataById } from "@/core/getUserDataById";
import { Claim, FormAddress, User } from "@/types";
import Vue from "vue";
import Vuex, { StoreOptions, GetterTree, MutationTree, ActionTree } from "vuex";

Vue.use(Vuex);

export interface State {
  user: User | null;
  claims: Claim[];
}

const getters: GetterTree<State, State> = {
  getUser: (state): User | null => state.user,
};

const mutations: MutationTree<State> = {
  setUser(state, user: User | null) {
    state.user = user;
  },
  addClaim(state, claim: Claim) {
    state.claims = [...state.claims, claim];
  },
};

const actions: ActionTree<State, State> = {
  async fetchUser({ commit }, userId: string) {
    const res = await getUserDataById(userId);

    if (res.error) {
      return console.error(res.error);
    }
    commit("setUser", res.user);
  },
  async createClaim(
    { commit },
    {
      userId,
      ipAddress,
      addresses,
    }: { userId: string; ipAddress: string; addresses: FormAddress[] }
  ) {
    const res = await createClaim(userId, ipAddress, addresses);

    if (res.error) {
      return console.error(res.error);
    }

    commit("addClaim", res.claim);
  },
};

const storeOptions: StoreOptions<State> = {
  state: {
    user: null,
    claims: [],
  },
  getters,
  mutations,
  actions,
  modules: {},
};

const store = new Vuex.Store<State>(storeOptions);

export default store;
