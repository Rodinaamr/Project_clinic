# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["dermatologyclinic.csproj", "./"]
RUN dotnet restore "dermatologyclinic.csproj"
COPY . .
RUN dotnet build "dermatologyclinic.csproj" -c Release -o /app/build

# Publish Stage
FROM build AS publish
RUN dotnet publish "dermatologyclinic.csproj" -c Release -o /app/publish

# Final Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "dermatologyclinic.dll"]
