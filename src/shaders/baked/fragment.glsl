uniform sampler2D uBakedDayTexture;
uniform sampler2D uBakedNightTexture;
uniform sampler2D uBakedNeutralTexture;

varying vec2 vUv;

void main()
{
    vec3 bakedDayColor = texture2D(uBakedDayTexture, vUv).rgb;
    vec3 bakedNightColor = texture2D(uBakedNightTexture, vUv).rgb;
    vec3 bakedNeutralColor = texture2D(uBakedNeutralTexture, vUv).rgb;

    vec3 bakedColor = mix(bakedDayColor, bakedNightColor, bakedNeutralColor);

    gl_FragColor = vec4(bakedColor, 1.0);
}