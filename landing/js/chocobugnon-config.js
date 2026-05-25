/** Supabase public config (Dashboard → API Keys → Publishable). */
window.CHOCO_BUGNON = {
  supabaseUrl: "https://qqzwkswfuiatpcqkfqcw.supabase.co",
  supabasePublishableKey:
    "sb_publishable_XxO0gTRUA7W88BFSmVlmKQ_1Z-y0C15",

  /** External links with UTM tracking (utm_source=website). */
  links: {
    mapsBase: "https://maps.app.goo.gl/YdtdmTtCYGd9o5u18?g_st=ac",
    social: {
      facebook: "https://www.facebook.com/ChocolaterieDuBugnon",
      instagram: "https://www.instagram.com/chocolaterie_du_bugnon/",
      pinterest: "https://www.pinterest.com/chocolaterie_du_bugnon/",
    },
    maps: function (campaign, content) {
      return (
        this.mapsBase +
        "&utm_source=website&utm_medium=maps&utm_campaign=" +
        encodeURIComponent(campaign) +
        "&utm_content=" +
        encodeURIComponent(content)
      );
    },
    socialUrl: function (platform, campaign) {
      var base = this.social[platform];
      var sep = base.indexOf("?") >= 0 ? "&" : "?";
      return (
        base +
        sep +
        "utm_source=website&utm_medium=social&utm_campaign=" +
        encodeURIComponent(campaign) +
        "&utm_content=" +
        encodeURIComponent(platform)
      );
    },
  },
};
